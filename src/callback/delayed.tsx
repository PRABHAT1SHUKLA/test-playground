import React, { useState, useCallback, useEffect } from "react";

const Timer = () => {
  const [count, setCount] = useState(0);

  const delayedIncrement = useCallback(() => {
    setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 2000);
  }, [count]);

  useEffect(() => {
    delayedIncrement();
   
    setTimeout(()=>{
       console.log("hello")
    },1000)

  }, [count]);

  return <div>Count: {count}</div>;
};

export default Timer;
