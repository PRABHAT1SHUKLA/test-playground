import axios from "axios"

import { useEffect, useState } from "react"

useEffect(()=>{
 
  
  fetchUserDetails()

},[])

const [user , setUser] = useState({username:"", password:"" })

const fetchUserDetails=async()=>{
 
  const token = localStorage.get("authToken")

  const userDetails = await axios.post('http://localhost:3000/me',{
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })

  setUser({username:userDetails.data.username , password:userDetails.data.password})
}


const Profile = () =>{


  return(

  <>
      {user.username}
      {user.password}
  </>

  )
}