import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggler: React.FC = () => {
  const { state, dispatch } = useTheme();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: state.theme === 'light' ? '#000' : '#fff' }}>
        Current Theme: {state.theme}
      </h1>
      <button
        onClick={toggleTheme}
        style={{
          padding: '10px 20px',
          backgroundColor: state.theme === 'light' ? '#000' : '#fff',
          color: state.theme === 'light' ? '#fff' : '#000',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeToggler;
