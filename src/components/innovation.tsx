import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";

// Context for theme
const ThemeContext = createContext("light");

// Reducer for mood logs
type Mood = {
  id: number;
  mood: "Happy" | "Neutral" | "Sad";
  message: string;
  date: string;
};

type MoodAction =
  | { type: "ADD_MOOD"; payload: Mood }
  | { type: "REMOVE_MOOD"; payload: number }
  | { type: "CLEAR_MOODS" };

const moodReducer = (state: Mood[], action: MoodAction): Mood[] => {
  switch (action.type) {
    case "ADD_MOOD":
      return [...state, action.payload];
    case "REMOVE_MOOD":
      return state.filter((mood) => mood.id !== action.payload);
    case "CLEAR_MOODS":
      return [];
    default:
      return state;
  }
};

// Custom Hook for local storage persistence
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.error("Error saving to local storage", error);
    }
  };

  return [storedValue, setValue] as const;
};

const MoodTrackerApp: React.FC = () => {
  const theme = useContext(ThemeContext);
  const [moods, dispatch] = useReducer(moodReducer, []);
  const [currentMood, setCurrentMood] = useState<Mood["mood"]>("Happy");
  const [message, setMessage] = useState("");
  const [insights, setInsights] = useState<string>("");
  const [persistedMoods, setPersistedMoods] = useLocalStorage<Mood[]>(
    "moodLogs",
    []
  );

  // Sync moods with local storage
  useEffect(() => {
    setPersistedMoods(moods);
  }, [moods]);

  useEffect(() => {
    if (persistedMoods.length > 0) {
      dispatch({ type: "CLEAR_MOODS" });
      persistedMoods.forEach((mood) =>
        dispatch({ type: "ADD_MOOD", payload: mood })
      );
    }
  }, []);

  const addMood = () => {
    const newMood: Mood = {
      id: Date.now(),
      mood: currentMood,
      message,
      date: new Date().toLocaleString(),
    };
    dispatch({ type: "ADD_MOOD", payload: newMood });
    setMessage("");
  };

  // Analyze mood trends
  const analyzeMoods = useCallback(() => {
    const moodCounts = moods.reduce(
      (acc, mood) => {
        acc[mood.mood]++;
        return acc;
      },
      { Happy: 0, Neutral: 0, Sad: 0 }
    );

    const total = moods.length;
    if (total > 0) {
      const happyPercentage = ((moodCounts.Happy / total) * 100).toFixed(1);
      const neutralPercentage = ((moodCounts.Neutral / total) * 100).toFixed(1);
      const sadPercentage = ((moodCounts.Sad / total) * 100).toFixed(1);

      setInsights(
        `Happy: ${happyPercentage}%, Neutral: ${neutralPercentage}%, Sad: ${sadPercentage}%`
      );
    } else {
      setInsights("No mood logs to analyze.");
    }
  }, [moods]);

  useEffect(() => {
    analyzeMoods();
  }, [moods, analyzeMoods]);

  return (
    <div
      className={`p-4 max-w-md mx-auto rounded shadow-md ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-xl font-bold mb-4">Mood Tracker</h1>
      <div className="mb-4">
        <select
          value={currentMood}
          onChange={(e) => setCurrentMood(e.target.value as Mood["mood"])}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="Happy">Happy</option>
          <option value="Neutral">Neutral</option>
          <option value="Sad">Sad</option>
        </select>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Why do you feel this way?"
          className="border p-2 rounded w-full"
        ></textarea>
        <button
          onClick={addMood}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Mood
        </button>
      </div>

      <h2 className="text-lg font-bold mb-2">Mood Logs</h2>
      <ul className="mb-4">
        {moods.map((mood) => (
          <li
            key={mood.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <span>
              <strong>{mood.mood}</strong>: {mood.message}{" "}
              <small className="text-gray-500">({mood.date})</small>
            </span>
            <button
              onClick={() => dispatch({ type: "REMOVE_MOOD", payload: mood.id })}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold mb-2">Insights</h2>
      <p>{insights}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <MoodTrackerApp />
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
        >
          Toggle Theme
        </button>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
