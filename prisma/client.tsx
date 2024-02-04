import { PrismaClient } from "@prisma/client";

declare global {
    namespace NodeJS {
        interface Global {}
    }
}

interface CustomNodeJsGlobal extends NodeJS.Global {
    prisma: PrismaClient
}
declare const global: CustomNodeJsGlobal
//checking if we are in production or not
//checks if client already exists, if it doesn't instantiate it
const client = global.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") global.prisma = client

export default client