import React, { useReducer, useMemo, useCallback } from "react";

// Define actions
type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

// Define the reducer
const counterReducer = (state: number, action: Action): number => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
};

const Counter: React.FC = () => {
  const [count, dispatch] = useReducer(counterReducer, 0);

  // Derived value using useMemo
  const doubledValue = useMemo(() => {
    console.log("Calculating doubled value...");
    return count * 2;
  }, [count]);

  // Handlers using useCallback
  const increment = useCallback(() => dispatch({ type: "increment" }), []);
  const decrement = useCallback(() => dispatch({ type: "decrement" }), []);
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <p>Doubled Value (Memoized): {doubledValue}</p>
      <button onClick={increment} style={{ marginRight: "0.5rem" }}>
        Increment
      </button>
      <button onClick={decrement} style={{ marginRight: "0.5rem" }}>
        Decrement
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
