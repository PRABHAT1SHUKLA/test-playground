import React, { useState, useEffect } from 'react';

const TypingSpeed: React.FC = () => {
  const [text, setText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);

  // Start timing when typing starts
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setText(e.target.value);
  };

  // Calculate WPM when typing stops for more than 2 seconds
  useEffect(() => {
    if (text.length > 0) {
      const timer = setTimeout(() => {
        if (startTime) {
          const elapsedTime = (Date.now() - startTime) / 1000 / 60; // Convert ms to minutes
          const wordCount = text.trim().split(/\s+/).length;
          setWpm(Math.round(wordCount / elapsedTime));
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [text, startTime]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Typing Speed Calculator</h1>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start typing here..."
        rows={8}
        value={text}
        onChange={handleChange}
      />
      <p className="mt-4 text-xl text-center">
        {wpm > 0 ? `Your typing speed: ${wpm} WPM` : 'Start typing to calculate your WPM.'}
      </p>
    </div>
  );
};

export default TypingSpeed;
