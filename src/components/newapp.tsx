import React, { useState, useEffect, useReducer, useMemo } from "react";

// Define types
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "REMOVE_TODO"; payload: number };

// Reducer function for managing todos
function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

const TodoApp: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [taskInput, setTaskInput] = useState("");
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  // Memoized values for performance
  const totalTasks = useMemo(() => todos.length, [todos]);
  const completedTasks = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  );
  const completedPercentage = useMemo(
    () => (totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0),
    [totalTasks, completedTasks]
  );

  const handleAddTask = () => {
    if (taskInput.trim()) {
      dispatch({ type: "ADD_TODO", payload: taskInput });
      setTaskInput("");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-100 shadow rounded">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List with Timer</h1>
      <p className="text-gray-600 text-center mb-4">Time spent: {secondsElapsed}s</p>

      {/* Task Input */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`p-2 flex justify-between items-center border rounded ${
              todo.completed ? "bg-green-100" : "bg-white"
            }`}
          >
            <span
              className={`flex-grow ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            <div className="space-x-2">
              <button
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Stats */}
      <div className="mt-4 text-center">
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>
          Completed:{" "}
          <span className="font-bold text-green-600">{completedPercentage.toFixed(2)}%</span>
        </p>
      </div>
    </div>
  );
};

export default TodoApp;
