import React, { useState, useCallback, useEffect } from "react";

const MouseTracker = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const trackMouse = useCallback((event: MouseEvent) => {
    setCoords({ x: event.clientX, y: event.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", trackMouse);
    return () => window.removeEventListener("mousemove", trackMouse);
  }, [trackMouse]);

  return (
    <div>
      <h2>Mouse Position</h2>
      <p>X: {coords.x}, Y: {coords.y}</p>
    </div>
  );
};

export default MouseTracker;
