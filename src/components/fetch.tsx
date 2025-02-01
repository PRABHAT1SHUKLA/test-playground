import { useEffect, useState } from "react";


const BASE = "https://jsonplaceholder.typicode.com";

interface POST{
  id:number;
  title:string
}

const Make = () =>{

  const [posts , setPosts] = useState<POST[]>()

  useEffect(()=>{

    const  fetchPosts = async() =>{
      const response = await fetch(`${BASE}/posts`)
      const data = await response.json()
      setPosts(data)
    }

    fetchPosts()
  },[])

  return <div>
    <div></div>
    {posts?.map((post)=>{
      return <li key={post.id}>{post.title}</li>
    })}

  </div>
  
}

export default Make