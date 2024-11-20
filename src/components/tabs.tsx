import { useEffect, useState } from "react"

const Tab = () => {
  const [active , setActive] = useState("todo1")
  const [data , setData] = useState({})
  const [loading , setLoading] = useState(false)

  useEffect(()=>{
    console.log(active)
    setLoading(true)
    fetch('https://dummyjson.com/todos/random').then(async res => {
      const json =  await res.json()
      //  setData(json)
      setData(json)
      setLoading(false)
    }

    )

  },[active])  

  return <>
   <button onClick={()=>{
    setActive("1")
   }} style={{ color: active =="1" ? "red": "black"}}> todo1</button>
   <button onClick={()=>{
    setActive("2")
   }} style={{ color: active =="2" ? "red": "black"}}> todo2</button>
   <button onClick={()=>{
    setActive("3")
   }} style={{ color: active =="3" ? "red": "black"}}> todo3</button>
   <button onClick={()=>{
    setActive("4")
   }} style={{ color: active =="4" ? "red": "black"}}> todo4</button>
   <button onClick={()=>{
    setActive("5")
   }} style={{ color: active =="5" ? "red": "black"}}> todo5</button>
   <br/>
   {loading? 'Loading...': data.id }
  </>

}

export default Tab