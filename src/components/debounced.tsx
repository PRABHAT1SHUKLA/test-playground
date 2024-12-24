import { useEffect, useState } from "react"

export const Debounce = () =>{
  const [query , setQuery] = useState<String>("")
  const [debouncequery , setDebouncedquery] = useState<String>("")
  
   
  useEffect(()=>{
    const timer  = setTimeout(()=>{
      setDebouncedquery(query)
    }, 500)

    return ()=>{
      clearInterval(timer)
      }

  },[query])


  useEffect(()=>{
    console.log("query inserted")
 },[debouncequery])

  return(
    <div>
      Search
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
    </div>
  )


}