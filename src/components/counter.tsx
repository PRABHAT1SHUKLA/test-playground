import React from 'react';
import useCounterStore from '../store/store';

const Counter: React.FC = () => {
  // Access state and actions from the store
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
