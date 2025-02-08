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
