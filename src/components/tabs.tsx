import { useState } from "react"

const Tab = () => {
  const [active , setActive] = useState("todo1")

  

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
  </>

}

export default Tab