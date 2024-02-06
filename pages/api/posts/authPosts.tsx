import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "GET"){
        //getting user and session checking against prisma db
        const session = await getServerSession(req, res, authOptions)
        if (!session){
            return res.status(401).json({message: "Please sign in"})
        }

        //try to get auth's user post
        try{
            //checking for specific user according to associated email
            const data = await prisma.user.findUnique({
                where: {
                    email: session.user?.email,
                },
                include: {
                    Post: {
                        //createdAt order
                        orderBy: {
                            createdAt: 'desc',
                        },
                    },
                    include: {
                        Comment: true,
                    },
                }
            })
            res.status(200).json(data)
        } catch(err){
            res.status(403).json({err: "Error has occurred while attempting to make post"})
        }
    }
}