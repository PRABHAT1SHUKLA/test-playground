import React, { useState, useEffect, useRef, useReducer, createContext, useContext } from "react";

// Create a context for the stopwatch theme
const ThemeContext = createContext("light");

// Reducer for stopwatch state
type StopwatchState = {
  time: number; // Time in milliseconds
  running: boolean;
};

type StopwatchAction =
  | { type: "START" }
  | { type: "STOP" }
  | { type: "RESET" }
  | { type: "TICK" };

const stopwatchReducer = (state: StopwatchState, action: StopwatchAction): StopwatchState => {
  switch (action.type) {
    case "START":
      return { ...state, running: true };
    case "STOP":
      return { ...state, running: false };
    case "RESET":
      return { time: 0, running: false };
    case "TICK":
      return { ...state, time: state.time + 10 };
    default:
      return state;
  }
};

// Custom hook to format time
const useFormattedTime = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(
    milliseconds
  ).padStart(2, "0")}`;
};

const StopwatchApp: React.FC = () => {
  const theme = useContext(ThemeContext);
  const [state, dispatch] = useReducer(stopwatchReducer, { time: 0, running: false });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const formattedTime = useFormattedTime(state.time);

  // Start and stop the interval based on the `running` state
  useEffect(() => {
    if (state.running) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.running]);

  return (
    <div
      className={`p-4 rounded shadow-md ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-xl font-bold mb-4">Stopwatch</h1>
      <div className="text-3xl font-mono mb-4">{formattedTime}</div>
      <div className="flex gap-4">
        <button
          onClick={() => dispatch({ type: state.running ? "STOP" : "START" })}
          className={`px-4 py-2 rounded ${
            state.running ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {state.running ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <StopwatchApp />
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
        >
          Toggle Theme
        </button>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
