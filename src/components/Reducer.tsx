import React, { useReducer } from "react";

// Define the shape of the state
interface CounterState {
  count: number;
}

// Define the possible action types
type CounterAction =
  | { type: "increment"; payload?: number }
  | { type: "decrement"; payload?: number }
  | { type: "reset" }
  | { type: "set"; payload: number };

// Reducer function
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case "increment":
      return { count: state.count + (action.payload || 1) };
    case "decrement":
      return { count: state.count - (action.payload || 1) };
    case "reset":
      return { count: 0 };
    case "set":
      return { count: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

const Counter: React.FC = () => {
  // Initialize state with useReducer
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Counter: {state.count}</h1>
      <div style={{ margin: "10px" }}>
        <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
        <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
      <div style={{ margin: "10px" }}>
        <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
          Increment by 5
        </button>
        <button onClick={() => dispatch({ type: "decrement", payload: 5 })}>
          Decrement by 5
        </button>
        <button onClick={() => dispatch({ type: "set", payload: 100 })}>
          Set to 100
        </button>
      </div>
    </div>
  );
};

export default Counter;
