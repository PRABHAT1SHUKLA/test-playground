import { useState } from "react";
import { useTodos } from "../hooks/useTodos";

const TodoApp = () => {
  const [text, setText] = useState("");
  const { todos, isLoading, isError, addTodoMutation, deleteTodoMutation } = useTodos();

  if (isLoading) return <p>Loading todos...</p>;
  if (isError) return <p>Failed to load todos</p>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-lg font-bold mb-2">Todo List</h2>
      
      {/* Add Todo */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) {
            addTodoMutation.mutate(text);
            setText("");
          }
        }}
        className="mb-4 flex"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="New Todo..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">Add</button>
      </form>

      {/* Display Todos */}
      <ul>
        {todos?.map((todo:any) => (
          <li key={todo.id} className="flex justify-between p-2 border-b">
            <span>{todo.text}</span>
            <button onClick={() => deleteTodoMutation.mutate(todo.id)} className="text-red-500">❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
