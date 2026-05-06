import React, { useState, useEffect } from "react";

const STORAGE_KEY = "advanced-counter-state";

interface CounterState {
  count: number;
  history: number[];
}

const AdvancedCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);

  // 🔹 Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);

    if (savedState) {
      try {
        const parsed: CounterState = JSON.parse(savedState);
        setCount(parsed.count);
        setHistory(parsed.history);
      } catch (error) {
        console.error("Failed to parse saved state:", error);
      }
    }
  }, []);

  // 🔹 Save to localStorage whenever count/history changes
  useEffect(() => {
    const stateToSave: CounterState = { count, history };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [count, history]); // 👈 dependency array matters

  // 🔹 Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        increment();
      } else if (e.key === "ArrowDown") {
        decrement();
      } else if (e.key.toLowerCase() === "r") {
        reset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // ✅ CLEANUP (super important)
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [count]); 
  // 👆 include count so the handler has fresh state
  // alternatively could avoid by using functional updates only

  // 🔹 Actions
  const increment = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      setHistory((h) => [...h, newCount]);
      return newCount;
    });
  };

  const decrement = () => {
    setCount((prev) => {
      const newCount = prev - 1;
      setHistory((h) => [...h, newCount]);
      return newCount;
    });
  };

  const reset = () => {
    setCount(0);
    setHistory([]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Advanced Counter</h2>

      <h1>{count}</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
      </div>

      <h3>History</h3>
      <ul>
        {history.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>

      <p style={{ marginTop: "10px", fontSize: "12px" }}>
        Use ↑ to increment, ↓ to decrement, R to reset
      </p>
    </div>
  );
};

export default AdvancedCounter;