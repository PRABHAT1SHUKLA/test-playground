import React, { useState, useEffect, useCallback } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  // ✅ Memoize function
  const handleResize = useCallback(() => {
    console.log("Window resized!", count);
  }, [count]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]); // Now, event listener is updated only when `count` changes

  return <button onClick={() => setCount(count + 1)}>Increment</button>;
};

export default App;
