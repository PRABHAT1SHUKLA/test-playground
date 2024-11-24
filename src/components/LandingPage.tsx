import { useState } from "react"

const LandingPage =()=>{
  
  const [show , setShow] = useState("false")



  return <div>
        LandingPage

        <button onClick={()=>{
          setShow(!show)
        }}>toggle for seeing your Profile </button>


        {show && <Profile/>}

        


  </div>
}

export  default LandingPage