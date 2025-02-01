import { useEffect, useRef, useState } from "react";


const BASE = "https://jsonplaceholder.typicode.com";

interface POST{
  id:number;
  title:string
}

const Make = () =>{

  const [posts , setPosts] = useState<POST[]>()

  const [error , setError] = useState()

  const [loading , setIsloading] = useState(false)

  const [page , setPage] = useState(0);

  const abortControllerRef = useRef<AbortController|null>(null)

  useEffect(()=>{

    const  fetchPosts = async() =>{
     
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController

      setIsloading(true)

      try{
        const response = await fetch(`${BASE}/posts?page=${page}`,{
          signal: abortControllerRef.current?.signal,
        })
        const data = (await response.json()) as POST[];
        setPosts(data)
      }catch(e:any){
        if(e.name === 'AbortError'){
          console.log("Aborted")
          return;
        }

        setError(e)
      }finally{
        setIsloading(false)
      }
     
      
    }

    fetchPosts()
  },[page])

 
  if(error){
    return <div> SomeThing went wrong</div>
  }
  return <div className="min-h-[200px]">
    <h1>Posts</h1>
    <button onClick={()=>{
      setPage(page+1)
    }}>INCREASE:{page}</button>
    
    {loading&&<div>LOADING...</div>}

     {!loading&&
     <ul>
      {posts?.map((post)=>{
      return <li key={post.id}>{post.title}</li>
    })}
     </ul>}

  </div>
  
}

export default Make