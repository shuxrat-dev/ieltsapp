
import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialMinutes: number = 40) => {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && totalSeconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setTotalSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive || totalSeconds === 0) {
      if(intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if(intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, totalSeconds]);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setTotalSeconds(initialMinutes * 60);
  };

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return { minutes, seconds, isActive, start, pause, reset };
};
