import { Center, Heading, Text, Button } from "native-base";
import React, { useState, useEffect, useContext } from "react";
import { NBaseHeader } from "../components/NBaseHeader";

export const TimerScreen = ({ task, completeTask, activeScreen }) => {
  const [seconds, setSeconds] = useState(task.minutes * 60);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let interval = null;
    if (!isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPaused, seconds]);

  const handlePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsPaused(true);
    setSeconds(task.minutes * 60);
  };

  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;

  return (
    <>
      <NBaseHeader title={activeScreen} />

      <Text>{task.name}</Text>
      <Heading>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}
      </Heading>
      <Button onPress={handlePlayPause}>{isPaused ? "Play" : "Pause"}</Button>
      <Button onPress={handleReset}>Reset</Button>
      <Button
        onPress={() => {
          completeTask(task.id);
        }}
      >
        complete dat shit
      </Button>
    </>
  );
};
