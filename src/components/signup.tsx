import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// const handleSubmit = (e:React.ChangeEvent<HTMLInputElement>) =>{
//   e.preventDefault();
  
//   try{
//     const message = await axios.post('http://localhost:5000/signup', formData)
//   }
// }

const navigate = useNavigate()


export default function Signup(){

  const [formdata , setFormdata] = useState({username:"", password:""})
  const [message , setMessage] = useState('')
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Extract 'name' and 'value' from the input
    setFormdata((prev) => ({ ...prev, [name]: value })); // Update the state
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formdata)
  
    try {
      const response = await axios.post('http://localhost:3000/signup', formdata); // Update with your backend URL
      setMessage(response.data.message); // Show success message

      navigate('/signin')
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Something went wrong'); // Show error message
    }
  };




  return (
    <>
      <div style={{ justifyContent:"center",alignItems:"center", backgroundColor:" #f7f7f7" , fontFamily:"cursive", minHeight:"100vh", minWidth:"100vw", fontSize:"40px"}}>
         Signup Form
         <form  onSubmit={handleSubmit} style={{backgroundColor:"#ffffff" , border:"1px solid #ddd" , borderRadius:"8px"}}>
           <div>
            <label style={{margin:"10px"}}>Username:</label>
            <input
            type="text"
            id="username"
            name="username"
            value={formdata.username}
            onChange={handleChange}
            required
          />
           </div>

           <div style={{marginBottom:"20px"}}>
            <label style={{margin:"10px"}}>Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              required
            
            />
           </div>

           <button type="submit" style={{width:"50%" , padding:"0.7rem", backgroundColor:"#007bff"}}>Sign Up</button>
           {message && <p className="message">{message}</p>}

         </form>
      </div>
    </>
  )
}