import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.status(401).json({ message: "Please signin to create a post." })
        }
    if (req.method === "DELETE"){
       const postId = req.body
        //fetch all posts
        try{
            const result = await prisma.post.delete({
                where: {
                    id: postId, 
                },
            })
            res.status(200).json(result)
        } catch(err){
            res.status(403).json({err: "Error deleting posts"})
        }
    }
}