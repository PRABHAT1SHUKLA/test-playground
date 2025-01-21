import React, { useState, useEffect } from "react";

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket("ws://localhost:8080");

    // Listen for messages
    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      // Send message to WebSocket server
      const ws = new WebSocket("ws://localhost:8080");
      ws.onopen = () => {
        ws.send(input);
        setInput("");
      };
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Redis Pub/Sub Chat</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "1rem",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index} style={{ margin: 0 }}>
            {msg}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
        style={{
          width: "80%",
          padding: "0.5rem",
          marginRight: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatApp;
