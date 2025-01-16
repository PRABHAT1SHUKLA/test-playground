import React, { useState, useContext, useReducer, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the type for posts
interface Post {
  id: number;
  title: string;
  body: string;
}

// Context and Reducer for managing app-wide filters
type FilterState = {
  searchTerm: string;
};

type FilterAction = { type: "SET_SEARCH_TERM"; payload: string };

const FilterContext = createContext<{
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
} | null>(null);

const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

// API Fetch Function
const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return data;
};

// Posts Component
const Posts: React.FC = () => {
  const { state, dispatch } = useContext(FilterContext)!;
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { data: posts, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Filter posts based on searchTerm
  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching posts.</div>;

  return (
    <div>
      <div>
        <h1>Posts</h1>
        <input
          type="text"
          placeholder="Search posts..."
          value={state.searchTerm}
          onChange={(e) => dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })}
          style={{ padding: "8px", marginBottom: "16px" }}
        />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredPosts?.map((post) => (
          <li
            key={post.id}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              margin: "8px 0",
              cursor: "pointer",
            }}
            onClick={() => setSelectedPost(post)}
          >
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 50)}...</p>
          </li>
        ))}
      </ul>
      {selectedPost && (
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            border: "1px solid #ddd",
            background: "#f9f9f9",
          }}
        >
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
          <button onClick={() => setSelectedPost(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

// App Component with Context Provider
const App: React.FC = () => {
  const [state, dispatch] = useReducer(filterReducer, { searchTerm: "" });

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
        <Posts />
      </div>
    </FilterContext.Provider>
  );
};

export default App;
