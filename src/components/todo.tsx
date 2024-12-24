import React, { useState, useEffect } from "react";

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]") as string[];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {t} <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
