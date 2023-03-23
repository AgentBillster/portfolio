import { Center, Heading, Text, Button, Fab } from "native-base";
import React, { useState, useEffect } from "react";

export const TimerScreen = ({ selectedTask, completeTask }) => {
  const [seconds, setSeconds] = useState(selectedTask.minutes * 60);
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
    setSeconds(selectedTask.minutes * 60);
  };

  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;

  return (
    <Center flex={1}>
      <Text>{selectedTask.name}</Text>
      <Heading>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}
      </Heading>
      <Button onPress={handlePlayPause}>{isPaused ? "Play" : "Pause"}</Button>
      <Button onPress={handleReset}>Reset</Button>
      <Button onPress={completeTask}>Reset</Button>
    </Center>
  );
};
