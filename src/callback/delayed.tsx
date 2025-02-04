import React, { useState, useCallback, useEffect } from "react";

const TimerComponent = () => {
  const [count, setCount] = useState(0);

  const delayedIncrement = useCallback(() => {
    setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 2000);
  }, []);

  useEffect(() => {
    delayedIncrement();
  }, [delayedIncrement]);

  return <div>Count: {count}</div>;
};

export default TimerComponent;
