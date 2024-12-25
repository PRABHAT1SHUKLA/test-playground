import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useReducer,
  useMemo,
} from "react";

type Action =
  | { type: "DRAW_START"; payload: { x: number; y: number } }
  | { type: "DRAW_MOVE"; payload: { x: number; y: number } }
  | { type: "DRAW_END" }
  | { type: "CLEAR_CANVAS" };

interface State {
  drawing: boolean;
  points: { x: number; y: number }[];
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "DRAW_START":
      return { ...state, drawing: true, points: [action.payload] };
    case "DRAW_MOVE":
      return state.drawing
        ? { ...state, points: [...state.points, action.payload] }
        : state;
    case "DRAW_END":
      return { ...state, drawing: false };
    case "CLEAR_CANVAS":
      return { drawing: false, points: [] };
    default:
      return state;
  }
};

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [state, dispatch] = useReducer(reducer, { drawing: false, points: [] });
  const [lineWidth, setLineWidth] = useState(5);
  const [color, setColor] = useState("#000000");

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx || state.points.length < 2) return;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    state.points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
  }, [state.points, lineWidth, color]);

  useEffect(() => {
    draw();
  }, [draw]);

  const canvasSize = useMemo(() => ({ width: 600, height: 400 }), []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dispatch({ type: "DRAW_START", payload: { x, y } });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!state.drawing) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dispatch({ type: "DRAW_MOVE", payload: { x, y } });
  };

  const handleMouseUp = () => {
    dispatch({ type: "DRAW_END" });
  };

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    dispatch({ type: "CLEAR_CANVAS" });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          border: "1px solid #ccc",
          cursor: state.drawing ? "crosshair" : "default",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <div style={{ marginTop: "10px" }}>
        <label>
          Line Width: 
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          Color: 
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <button
          onClick={clearCanvas}
          style={{
            marginLeft: "20px",
            padding: "5px 10px",
            backgroundColor: "#f00",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
