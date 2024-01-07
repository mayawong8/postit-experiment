import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import prisma from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "POST"){
        const session = await getServerSession(req, res, authOptions)
        if (!session){
            return res.status(401).json({message: "Please sign in to make post"})
        }
        const title: string = req.body.title

        const prismaUser = prisma.user.findUnique({
            where: {email: session?.user?.email}
        })

        //printing content of desired post
        if(title.length > 300){
            return res.status(403).json({message: "Please write a shorter post under 300 characters"})
        }
        //this if doesn't look right
        if(!title.length){
            return res.status(403).json({message: "Please do not leave textbox blank"})
        }

        try{
            const result = await prisma.post.create({
                data: {
                    title, 
                    userId: prismaUser.id,
                },
            })
            res.status(200).json(result)
        } catch(err){
            res.status(403).json({err: "Error has occurred while attempting to make post"})
        }
    }
}