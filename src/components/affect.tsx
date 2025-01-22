import React, { useReducer, useMemo, useCallback, useState } from "react";

// Todo type
type Todo = { id: number; text: string; completed: boolean };

// Actions for the reducer
type Action =
  | { type: "add"; text: string }
  | { type: "toggle"; id: number }
  | { type: "delete"; id: number };

// Reducer to manage todos
const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), text: action.text, completed: false },
      ];
    case "toggle":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "delete":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

const TodoList: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [input, setInput] = useState("");

  // Memoized filtered todos
  const filteredTodos = useMemo(() => {
    console.log("Filtering todos...");
    return todos.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    });
  }, [todos, filter]);

  // Memoized addTodo function
  const addTodo = useCallback(() => {
    if (input.trim()) {
      dispatch({ type: "add", text: input });
      setInput("");
    }
  }, [input]);

  // Memoized toggleTodo function
  const toggleTodo = useCallback((id: number) => {
    dispatch({ type: "toggle", id });
  }, []);

  // Memoized deleteTodo function
  const deleteTodo = useCallback((id: number) => {
    dispatch({ type: "delete", id });
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          style={{
            padding: "0.5rem",
            marginRight: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <div style={{ margin: "1rem 0" }}>
        <label>
          <input
            type="radio"
            value="all"
            checked={filter === "all"}
            onChange={() => setFilter("all")}
          />
          All
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            value="completed"
            checked={filter === "completed"}
            onChange={() => setFilter("completed")}
          />
          Completed
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            value="pending"
            checked={filter === "pending"}
            onChange={() => setFilter("pending")}
          />
          Pending
        </label>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
                flexGrow: 1,
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                marginLeft: "0.5rem",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "0.3rem 0.5rem",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
