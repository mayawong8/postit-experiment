'use client'

// import {useQuery} from '@tanstack/react-query'
import { useQuery } from "react-query"
import axios from "axios"
import { PostType } from "@/app/types/Posts"
import Post from "@/app/components/Post"
import AddComment from "@/app/components/AddComment"
import Image from "next/image"

type URL = {
    params: {
        slug: string
    }
}

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

export default function PostDetail(url: URL) {
    const {data, isLoading} = useQuery<PostType[]>({
        queryKey: ['detail-post'],
        queryFn: () => fetchDetails(url.params.slug)
    })
    if (isLoading) return "Loading..."
    //Loop thru every Comment
    return (
        <div>
            <Post 
            id={data?.id} 
            name={data.user.name} 
            avatar={data.user.image} 
            postTitle={data.title} 
            comments={data.Comment}/>
            <AddComment id={data?.id}/>
            {data?.Comment?.map((comment) => (
                <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
                    <div className="flex items-center gap-2">
                            <Image
                    width={24}
                    height={24}
                    src={comment.user?.image}
                    alt="avatar"
                    />
                        <h3 className="fond-bold">{comment?.user?.name}</h3>
                        <h2 className="text-sm">{comment.createdAt}</h2>
                    </div>
                    <div className="py-4">{comment.message}</div>
                </div>

            ))}
        </div>
        
    )
}