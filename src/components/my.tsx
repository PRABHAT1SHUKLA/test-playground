import { useReducer } from "react"

const heroReducer =(state:string, action:{type:string} ) : string=>{
  switch(action.type){
    case 'batman':
      return 'Gotham KNight';
    case 'spiderman':
      return 'Web Slinger';
    case 'superman':
      return 'saviour of earth';
      default:
        return 'Nothing'
  }
}

export const Ps = () =>{
  const [ property, dispatch] = useReducer(heroReducer , "nothing")

  return(
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" ,  backgroundColor: "#121212" }}>
      <h1>Property : {property}</h1>

      <button onClick={()=>{dispatch({type:'batman'})}}>batman</button>
      <button onClick={()=>{dispatch({type:'superman'})}}>superman</button>
      <button onClick={()=>{dispatch({type:'spiderman'})}}>spiderman</button>


    </div>
  )
}

