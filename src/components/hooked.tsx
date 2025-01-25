import React, { useState, useEffect } from 'react';

const RandomColorBackground = () => {
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
      }}
    >
      <h1>Background Color: {color}</h1>
    </div>
  );
};

export default RandomColorBackground;





export default function Post(){
  return <>
    <div style= {{display:"flex" , backgroundColor:"#0D1117", color:"white", height:"100vh" , width:"100vw"}}>
      <div style= {{fontSize:'100px' , marginLeft:'20px'}}> hello</div>
      <div style= {{fontSize:'100px' , marginLeft:'20px'}}> hello</div>

    </div>
      <h1 style={{fontFamily:'cursive', color:'#333'}}>Prabhat shukla</h1>
  </>
}

import React, { useState } from "react";

const PaginationExample = () => {
  // Mock data
  const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Pagination Example</h1>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            style={{
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default PaginationExample;
