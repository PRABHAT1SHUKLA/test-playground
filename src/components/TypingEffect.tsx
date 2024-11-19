import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text = "Hlxclo, welcome to the typing effect demo!" }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    setDisplayedText(''); // Reset text whenever `text` changes

    const intervalId = setInterval(() => {
      if (index < text.length-1) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(intervalId); // Stop interval once all characters are appended
      }
    }, 200);

    return () => clearInterval(intervalId); // Cleanup interval on unmount or text change
  }, [text]);

  return <h1>{displayedText}</h1>;
};

export default TypingEffect;
