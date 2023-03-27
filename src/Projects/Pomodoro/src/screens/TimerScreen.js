import { Heading, Text, Button } from "native-base";
import React, { useState, useEffect } from "react";
import { NBaseHeader } from "../components/NBaseHeader";

export const TimerScreen = ({ task, completeTask, activeScreen }) => {
  const [seconds, setSeconds] = useState(task.minutes * 60);
  const [isPaused, setIsPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (!isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (seconds === 0) {
        setIsPaused(true);
        setIsBreak(!isBreak);
        setSeconds(isBreak ? 5 * 60 : 25 * 60); // Break time is 5 minutes, work time is 25 minutes
      }
    }
    return () => clearInterval(interval);
  }, [isPaused, seconds, isBreak]);

  const handlePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsPaused(true);
    setIsBreak(false);
    setSeconds(task.minutes * 60);
  };

  const handleSkip = () => {
    setIsPaused(true);
    setIsBreak(!isBreak);
    setSeconds(isBreak ? 25 * 60 : 5 * 60); // Go to next phase
  };

  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;

  return (
    <>
      <NBaseHeader title={activeScreen} />

      <Text fontSize="4xl" fontWeight="bold">
        {isBreak ? "Break Time!" : "Work Time!"}
      </Text>
      <Heading>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}
      </Heading>
      <Button onPress={handlePlayPause}>{isPaused ? "Play" : "Pause"}</Button>
      <Button onPress={handleReset}>Reset</Button>
      <Button onPress={handleSkip}>Skip</Button>
      <Button
        onPress={() => {
          completeTask(task.id);
        }}
      >
        mark completed
      </Button>
    </>
  );
};
