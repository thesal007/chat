import bcrypt from  "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma  from "@/app/libs/prismadb";
export const authOptions:AuthOptions={
    adapter: PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        //basic sigin signup with email as password
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email: {label:'email',type:'text'},
                password:{label:'password',type:'password'},
            },
            async authorize(credentials){
                //user pass emaail&password but not has in database
                if(!credentials?.email || !credentials?.password){
                    throw new Error ('Invalide Credentials');
                }
                //find user by unique id has be found
                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                });
                
                //check if sigin without google or github
                if(!user || !user?.hashedPassword){
                    throw new Error ('Invalid crendentials');
                }

                //check correct password with hash
                const isCorreectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                    
                );
                if(!isCorreectPassword){
                    throw new Error ('Invalid Credentials')
                }
                return user;
              
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session:{
        strategy: 'jwt',
    },
    secret:process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export {handler as GET ,handler as POST};