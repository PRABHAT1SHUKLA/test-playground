import React, { useReducer, useMemo } from "react";

// Define the state type
interface State {
  count: number;
}

// Define the action types
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "set"; payload: number };

// Initial state
const initialState: State = {
  count: 0,
};

// Reducer function
const counterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    case "set":
      return { count: action.payload };
    default:
      throw new Error("Unknown action type");
  }
};

// React component
const Counter: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  // Derived value using useMemo
  const doubledCount = useMemo(() => {
    console.log("Calculating doubled count...");
    return state.count * 2;
  }, [state.count]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>React Counter with useReducer and useMemo</h1>
      <p>Current Count: {state.count}</p>
      <p>Doubled Count (Memoized): {doubledCount}</p>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
        <button onClick={() => dispatch({ type: "decrement" })} style={{ marginLeft: "1rem" }}>
          Decrement
        </button>
        <button onClick={() => dispatch({ type: "reset" })} style={{ marginLeft: "1rem" }}>
          Reset
        </button>
        <button
          onClick={() => dispatch({ type: "set", payload: 10 })}
          style={{ marginLeft: "1rem" }}
        >
          Set to 10
        </button>
      </div>
    </div>
  );
};

export default Counter;
