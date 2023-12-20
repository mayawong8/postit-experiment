import { PrismaClient } from "@prisma/client";

//checking if we are in production or not
//checks if client already exists, if it doesn't instantiate it
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client