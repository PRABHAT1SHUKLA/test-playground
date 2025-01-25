import React, { useState, useEffect } from 'react';

const RandomColorBackground = () => {
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
      }}
    >
      <h1>Background Color: {color}</h1>
    </div>
  );
};

export default RandomColorBackground;





export default function Post(){
  return <>
    <div style= {{display:"flex" , backgroundColor:"#0D1117", color:"white", height:"100vh" , width:"100vw"}}>
      <div style= {{fontSize:'100px' , marginLeft:'20px'}}> hello</div>
      <div style= {{fontSize:'100px' , marginLeft:'20px'}}> hello</div>

    </div>
      <h1 style={{fontFamily:'cursive', color:'#333'}}>Prabhat shukla</h1>
  </>
}