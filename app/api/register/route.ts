import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        const {
            email,
            name,
            password
        } = body
        if (!email || !name || !password) {
            return new NextResponse('Missing info', { status: 400 })
        }
        //store with hashedpassword 
        const hashedPassword = await bcrypt.hash(password, 12);
        //defind user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        })
        return NextResponse.json(user);
    }catch (error:any){
        console.log(error,'REGISTRATION_ERROR');
        return new NextResponse('Interal Error',{status:500})
    }
    
}