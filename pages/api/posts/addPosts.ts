import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "POST"){
        //getting user and session checking against prisma db
        const session = await getServerSession(req, res, authOptions)
        if (!session){
            return res.status(401).json({message: "Please sign in to create post"})
        }

        const title: string = req.body.title
        //Get user
        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email},
        })
        //check title
        if (title.length > 300){
            return res.status(403).json({message: "Please write a shorter post"})
        }
        if (!title.length){
            return res.status(403).json({message: "Please write something to post"})
        }
        try{
            const result = await prisma.post.create({
                data: {
                    title, 
                    userId: prismaUser?.id,
                },
            })
            res.status(200).json(result)
        } catch(err) {
            res.status(403).json({err: "Error ocurred while making a post"})
        }
        //try to get auth's user post
        // try{
        //     //checking for specific user according to associated email
        //     const data = await prisma.user.findUnique({
        //         where: {
        //             email: session.user?.email,
        //         },
        //         include: {
        //             Post: {
        //                 //createdAt order
        //                 orderBy: {
        //                     createdAt: 'desc',
        //                 },
        //             },
        //             include: {
        //                 Comment: true,
        //             },
        //         }
        //     })
        //     res.status(200).json(data)
        // } catch(err){
        //     res.status(403).json({err: "Error has occurred while attempting to make post"})
        // }
    }
}