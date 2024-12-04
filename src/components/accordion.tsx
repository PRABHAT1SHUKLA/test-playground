import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-t-lg"
      >
        <div className="flex justify-between items-center">
          <span className="font-medium text-lg">{title}</span>
          <span>{isOpen ? '-' : '+'}</span>
        </div>
      </button>
      {isOpen && (
        <div className="px-4 py-2 bg-white">
          <p className="text-gray-700">{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
