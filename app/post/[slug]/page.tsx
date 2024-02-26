'use client'

// import {useQuery} from '@tanstack/react-query'
import { useQuery } from "react-query"
import axios from "axios"
import { PostType } from "@/app/types/Posts"
import Post from "@/app/components/Post"
import AddComment from "@/app/components/AddComment"

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
    return (
        <div>
            <Post 
            id={data?.id} 
            name={data.user.name} 
            avatar={data.user.image} 
            postTitle={data.title} 
            comments={data.comments}/>
            <AddComment id={data?.id}/>
        </div>
        
    )
}