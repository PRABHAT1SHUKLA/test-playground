import React, { useState, useCallback, useEffect } from "react";

const KeyLogger = () => {
  const [key, setKey] = useState("");

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    setKey(event.key);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return <h2>Last Key Pressed: {key}</h2>;
};

export default KeyLogger;

import React, { useState, useCallback } from "react";

const Button = React.memo(({ handleClick }: { handleClick: () => void }) => {
  console.log("Button Rendered!");
  return <button onClick={handleClick}>Click Me</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  // ✅ Memoize function
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // Function reference remains the same

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <Button handleClick={increment} />
    </div>
  );
};

export default Parent;
