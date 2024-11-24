import { useState } from "react"
import Profile from "./Profile"

const LandingPage =()=>{
  
  const [show , setShow] = useState(false)



  return <div>
        LandingPage

        <button onClick={()=>{
          setShow(!show)
        }}>toggle for seeing your Profile </button>


        {show && <Profile/>}

        


  </div>
}

export  default LandingPage