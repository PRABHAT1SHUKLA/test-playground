import React, { useState, useEffect, useRef, useCallback, useReducer, useMemo } from "react";

// Reducer for managing search state
interface SearchState {
  query: string;
  results: string[];
  loading: boolean;
  error: string | null;
}

type SearchAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_RESULTS"; payload: string[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_RESULTS":
      return { ...state, results: action.payload, loading: false, error: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SearchComponent: React.FC = () => {
  const [state, dispatch] = useReducer(searchReducer, {
    query: "",
    results: [],
    loading: false,
    error: null,
  });

  const debounceTimer = useRef<NodeJS.Timeout | null>(null); // Ref to handle debouncing
  const inputRef = useRef<HTMLInputElement | null>(null); // Ref for input element

  // Mock API function to fetch data
  const fetchResults = useCallback(async (query: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      // Simulating an API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (query === "error") {
        throw new Error("Simulated API error");
      }
      const mockData = ["Apple", "Banana", "Cherry", "Date", "Elderberry"].filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      dispatch({ type: "SET_RESULTS", payload: mockData });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: (error as Error).message });
    }
  }, []);

  // Debounced search handler
  const handleSearch = useCallback(
    (query: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => fetchResults(query), 500);
    },
    [fetchResults]
  );

  // Handle input change
  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      dispatch({ type: "SET_QUERY", payload: query });
      handleSearch(query);
    },
    [handleSearch]
  );

  // Focus input on mount using useEffect and useRef
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Memoized filtered results length
  const resultCount = useMemo(() => state.results.length, [state.results]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Real-Time Search with Debouncing</h2>
      <input
        type="text"
        ref={inputRef}
        value={state.query}
        onChange={onInputChange}
        placeholder="Search..."
        style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
      />
      {state.loading && <p>Loading...</p>}
      {state.error && <p style={{ color: "red" }}>Error: {state.error}</p>}
      <ul>
        {state.results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
      <p>Total Results: {resultCount}</p>
    </div>
  );
};

export default SearchComponent;
