import React, { useState, useEffect, useReducer, useRef, useContext, createContext, useCallback } from "react";

// Context for user information
const UserContext = createContext({ username: "Guest" });

// Reducer for managing chat messages
type Message = { id: number; user: string; text: string; time: string };

const chatReducer = (state: Message[], action: { type: string; payload?: any }): Message[] => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [...state, action.payload];
    case "CLEAR_CHAT":
      return [];
    default:
      return state;
  }
};

// Custom hook for formatted time
const useFormattedTime = () => {
  const getTime = useCallback(() => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
  }, []);

  return getTime;
};

const ChatApp: React.FC = () => {
  const { username } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, dispatch] = useReducer(chatReducer, []);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const getFormattedTime = useFormattedTime();

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          id: Date.now(),
          user: username,
          text: message,
          time: getFormattedTime(),
        },
      });
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h1 className="text-lg font-bold mb-4">Live Chat</h1>
      <div className="h-64 overflow-y-auto border p-2 mb-4 bg-gray-100 rounded">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <span className="font-bold">{msg.user}</span>{" "}
            <span className="text-xs text-gray-500">({msg.time})</span>:{" "}
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border px-2 py-1 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
      <button
        onClick={() => dispatch({ type: "CLEAR_CHAT" })}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Clear Chat
      </button>
    </div>
  );
};

// App Component with User Context
const App: React.FC = () => {
  const [username, setUsername] = useState("Guest");

  // Simulate user login
  useEffect(() => {
    setTimeout(() => {
      setUsername("JohnDoe");
    }, 2000);
  }, []);

  return (
    <UserContext.Provider value={{ username }}>
      <ChatApp />
    </UserContext.Provider>
  );
};

export default App;
