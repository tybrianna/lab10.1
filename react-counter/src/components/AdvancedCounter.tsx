import { useState } from 'react';
 
function Counter() {
  const [count, setCount] = useState(0); // count is the state, setCount is the updater
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}