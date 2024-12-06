import React, { useState, useEffect } from "react";
import "./styles.css"; // Add some Tailwind styles or your custom styles

const AnimatedComponent: React.FC = () => {
  const [displayText, setDisplayText] = useState(""); // For typing effect
  const [isButtonVisible, setIsButtonVisible] = useState(false); // Show button after text

  const fullText = "Welcome to the React Magic! 🚀";

  useEffect(() => {
    let textIndex = 0;

    // Typing effect using setInterval
    const typingInterval = setInterval(() => {
      if (textIndex < fullText.length) {
        setDisplayText((prev) => prev + fullText[textIndex]);
        textIndex++;
      } else {
        clearInterval(typingInterval);
        // Delay before showing the button
        setTimeout(() => setIsButtonVisible(true), 1000);
      }
    }, 100); // Typing speed: 100ms per character

    // Cleanup interval on component unmount
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* Typing Effect */}
      <h1 className="text-4xl font-bold text-center">{displayText}</h1>

      {/* Glowing Button */}
      {isButtonVisible && (
        <button
          onClick={() => alert("Let's React! 🎉")}
          className="mt-8 px-6 py-3 text-lg font-semibold text-gray-900 bg-yellow-400 rounded-lg shadow-lg 
          hover:shadow-yellow-500/50 transition-all duration-300 
          glow-animation"
        >
          Get Started
        </button>
      )}
    </div>
  );
};

export default AnimatedComponent;
