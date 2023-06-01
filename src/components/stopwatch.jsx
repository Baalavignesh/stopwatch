import React, { useState, useRef } from "react";

function Stopwatch() {
  const [myTime, setMyTime] = useState(0);
  const [running, setRunning] = useState(false);
  const watchRef = useRef();

  const StartWatch = () => {
    if (!running) {
      const startTime = Date.now() - myTime;
      watchRef.current = setInterval(() => {
        const currentTime = Date.now();
        setMyTime(currentTime - startTime);
      }, 10);
      setRunning(true);
    }
  };

  const stopWatch = () => {
    clearInterval(watchRef.current);
    setRunning(false);
  };

  const resetWatch = () => {
    clearInterval(watchRef.current);
    setMyTime(0);
    if (running) {
      StartWatch();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
  };

  const padTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-center font-normal text-4xl">My Stopwatch</h1>
      <div className="w-full flex justify-around items-center">
        <button
          onClick={resetWatch}
          className="rounded-full p-10 bg-neutral-500 border-2 grow-0 shrink-0 w-32 h-32 border-gray-700 bg-opacity-90"
        >
          <span className="text-xl font-normal text-white opacity-100">
            Reset
          </span>
        </button>
        <h2 className="text-6xl text-center">{formatTime(myTime)}</h2>

        {!running ? (
          <button
            onClick={StartWatch}
            className="rounded-full p-10 bg-green-800 border-2 grow-0 shrink-0 w-32 h-32 border-gray-700 bg-opacity-90"
          >
            <span className="text-xl font-normal text-lime-300 opacity-100">
              Start
            </span>
          </button>
        ) : (
          <button
            onClick={stopWatch}
            className="rounded-full p-10 bg-red-800 border-2 grow-0 shrink-0 w-32 h-32 border-gray-700 bg-opacity-90"
          >
            <span className="text-xl font-medium text-yellow-500 opacity-100">
              Stop
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Stopwatch;
