import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Define state type and actions
type ThemeState = {
  theme: 'light' | 'dark';
};

type ThemeAction = { type: 'TOGGLE_THEME' };

// Initial state for the theme
const initialState: ThemeState = {
  theme: 'light',
};

// Reducer function to handle the theme toggle action
const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

// Create the ThemeContext with default value as undefined
const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
} | undefined>(undefined);

// ThemeProvider component to wrap the app and provide the context
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
