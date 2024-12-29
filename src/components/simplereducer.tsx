import React, { useReducer } from "react";

// Step 1: Define the reducer function
const counterReducer = (state: number, action: { type: string }): number => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    case "fuck":
      return state  + 2; 
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Step 2: Create the component
const Countre: React.FC = () => {
  // Step 3: Initialize the reducer with useReducer
  const [count, dispatch] = useReducer(counterReducer, 0);

  

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "fuck" })}>yes</button>
    </div>
  );
};

export default Countre;
