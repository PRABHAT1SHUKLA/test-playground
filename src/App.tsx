import { useEffect, useState } from 'react'

import './App.css'

function App() {

  
  return (
    <>
    <TrafficLight/>


 
    </>
  )
}


const TrafficLight = () => {
  const [light, setLight] = useState('red'); // Start with red light

  useEffect(() => {
    const lights = ['red', 'yellow', 'green'];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % lights.length;
      setLight(lights[currentIndex]);
    }, 500); // Change every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: light === 'red' ? 'red' : '#ccc',
          margin: '10px auto',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: light === 'yellow' ? 'yellow' : '#ccc',
          margin: '10px auto',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: light === 'green' ? 'green' : '#ccc',
          margin: '10px auto',
          borderRadius: '50%',
        }}
      />
    </div>
  );
};





export default App
