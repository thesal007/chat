import { PrismaClient } from "@prisma/client";
declare global {
    var prisma : PrismaClient | undefined;
}
const client = globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV !== 'production') globalThis.prisma= client;
export default client;
//globalThis: This is used to access the global object in both browser and Node.js environments
//declare global {}: This allows you to extend the global scope in TypeScript, adding custom global variables. Here, you're declaring prisma as a global variable.