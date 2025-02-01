import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = "http://localhost:5000/todos";

// Fetch todos
const fetchTodos = async () => {
  const { data } = await axios.get(API_BASE);
  return data;
};

// Hook for managing todos
export const useTodos = () => {
  const queryClient = useQueryClient();

  // Get todos
  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // Add a new todo
  const addTodoMutation = useMutation({
    mutationFn: async (text: string) => {
      const { data } = await axios.post(API_BASE, { text });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']}); // Refetch todos
    },
  });

  // Delete a todo
  const deleteTodoMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']}); // Refetch todos
    },
  });

  return { todos, isLoading, isError, addTodoMutation, deleteTodoMutation };
};
