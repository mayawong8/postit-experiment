'use client'
import AddPost from './components/AddPost'
import axios from "axios"
import {useQuery} from 'react-query'
import Post from './components/Post'

//Fetch all posts
interface PostType {
  id: string;
  user: {
    name: string;
    image: string;
  };
  title: string;
}

const allPosts = async() => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}
export default function Home() {
  const {data, error, isLoading} = useQuery({
    queryFn: allPosts, 
    queryKey:["posts"],
  })
  if(error) return error
  if (isLoading) return "Loading..."

  return (
    <main>
      <AddPost/>
      {data?.map((post: PostType)=> (
        <Post 
        key={post.id} 
        name={post.user.name} 
        avatar={post.user.image} 
        postTitle={post.title}
        id={post.id}/>
      ))}
    </main>
  )
}
