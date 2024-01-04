'use client'

import { useState } from "react"
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios from "axios"
//allows you to make a mutation --> updating, deleting, or creating

export default function CreatePost(){
    const [title, setTitle] = useState("")
    const [isDisabled, setDisabled] = useState(false)

    //Create a post
    const {mutate} = useMutation(
        async (title) => await axios.post("/api/posts/addPost", {title})
    )

    return (
        <form className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea 
                onChange={(e) => setTitle(e.target.value)} 
                name="title" 
                value={title}
                placeholder="What's on your mind?"
                className="p-4 text-lg rounded-md my-2 bg-gray-200">
                </textarea>
            </div>
            <div className={`flex items-center justify-between gap-2`}>
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
                <button
                disabled={isDisabled}
                className="text-sm bg-teal-600 text-white py-2 px-4 rounded-xl disabled:opacity-25"
                type="submit">
                    Create a post
                </button>
            </div>
        </form>
    )
}