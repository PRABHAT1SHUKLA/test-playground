import React, { useState, useEffect } from "react";

const Event= () => {
  const [count, setCount] = useState(0);

  const handleResize = () => {
    console.log("Window resized!", count);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]); // handleResize is re-created every render

  return <button onClick={() => setCount(count + 1)}>Increment</button>;
};

export default Event;
