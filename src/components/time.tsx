import { useEffect, useState } from "react"

const Time = () =>{

  const [ timer , setTimer] = useState<number>(0) 

  useEffect(()=>{
    let i = setInterval(()=>{
      console.log("hello")
      setTimer(timer + 1)
   },1000)


   return clearInterval(i)
  },[timer])
  return (
    <div>dncksncksndkcnskncksdnc
      {timer}
    </div>
  )
}
export default Time