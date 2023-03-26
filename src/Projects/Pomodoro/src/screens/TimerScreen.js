import { Center, Heading, Text, Button } from "native-base";
import React, { useState, useEffect, useContext } from "react";
import { TaskContext } from "../context/TaskProvider";

export const TimerScreen = ({ navigateToScreen, task, index }) => {
  const [seconds, setSeconds] = useState(task.minutes * 60);
  const [isPaused, setIsPaused] = useState(true);

  const { completeTask } = useContext(TaskContext);

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
    <Center flex={1}>
      <Text>{task.name}</Text>
      <Heading>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}
      </Heading>
      <Button onPress={handlePlayPause}>{isPaused ? "Play" : "Pause"}</Button>
      <Button onPress={handleReset}>Reset</Button>
      <Button
        onPress={() => {
          completeTask(index);
          navigateToScreen("Tasks");
        }}
      >
        complete dat shit
      </Button>
    </Center>
  );
};
