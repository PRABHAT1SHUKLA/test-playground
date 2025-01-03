import React, { useState, useEffect, useReducer, useRef, useContext, createContext } from "react";

// Create a context for the theme
const ThemeContext = createContext("light");

// Reducer for managing todos
type Todo = { id: number; text: string; completed: boolean };

const todoReducer = (state: Todo[], action: { type: string; payload?: any }): Todo[] => {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const TodoApp: React.FC = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [inputValue, setInputValue] = useState("");
  const [todos, dispatch] = useReducer(todoReducer, []);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input field when the component mounts
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Log the theme whenever it changes
  useEffect(() => {
    console.log(`Theme changed to: ${theme}`);
  }, [theme]);

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: "ADD", payload: inputValue });
      setInputValue("");
    }
  };

  return (
    <div className={`p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <h1 className="text-xl font-bold mb-4">Todo App with Hooks</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task..."
          className="border px-2 py-1 rounded flex-grow"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center mb-2 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <span>{todo.text}</span>
            <div>
              <button
                onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}
                className="bg-yellow-500 text-white
