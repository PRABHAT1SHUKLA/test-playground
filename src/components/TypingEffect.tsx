import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text = "Hlxclo, welcome to the typing effect demo!" }) => {
  const [displayedText, setDisplayedText] = useState('');
  
 
  useEffect(() => {
   let index =0
    setDisplayedText('')
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index >= text.length) clearInterval(intervalId);
    }, 200);

    return () => clearInterval(intervalId);
  }, [text]);

  return <h1>{displayedText}</h1>;
};

export default TypingEffect;
