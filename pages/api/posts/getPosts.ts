import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "GET"){
        //fetch all posts
        try{
            const data = await prisma.post.findMany({
                include: {
                    user: true,
                    Comment: true,
                },
                orderBy: {
                    createdAt: 'desc'
                },
            })
            res.status(200).json(data)
        } catch(err){
            res.status(403).json({err: "Error fetching posts"})
        }
    }
}