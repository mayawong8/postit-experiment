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
        //printing content of desired post
        if(title.length > 300) return res.status(403).json({message: "Please write a shorter post under 300 characters"})
        if(title.length == 0) return res.status(403).json({message: "Please do not leave textbox blank"})

        try{

        } catch(err){}
    }
}