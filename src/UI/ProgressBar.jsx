import { useState, useEffect } from "react";

let TIMER = 3000;
export default function ProgressBar({ onConfirm }) {
  const [timeRemaining, setTimeRemaing] = useState(TIMER);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("INTERVAL");
      setTimeRemaing((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log("Timer Set");
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      console.log("Cleaning up timer");
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return <progress value={timeRemaining} max={TIMER}></progress>;
}
