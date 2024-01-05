import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "POST"){
        const session = await getServerSession(req, res, authOptions)
        if (!session){
            return res.status(401).json({message: "Please sign in to make post"})
        }
        
        //printing content of desired post
        console.log(req.body)
    }
}