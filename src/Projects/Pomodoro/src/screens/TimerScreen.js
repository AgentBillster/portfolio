import { Text, Button, Center, VStack } from "native-base";
import React, { useState, useEffect } from "react";

export const TimerScreen = ({ task, completeTask, activeScreen }) => {
  const [intervalCount, setIntervalCount] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isPaused, setIsPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (!isPaused && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((seconds) => seconds - 1);
        setSecondsElapsed((seconds) => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (secondsRemaining === 0) {
        setIsPaused(true);
        setIsBreak(!isBreak);
        setSecondsRemaining(isBreak ? 5 * 60 : 25 * 60); // Break time is 5 minutes, work time is 25 minutes
        setSecondsElapsed(0);
      } else if (isPaused && isBreak) {
        interval = setInterval(() => {
          setSecondsRemaining((seconds) => seconds - 1);
          setSecondsElapsed((seconds) => seconds + 1);
        }, 1000);
      }
    }
    return () => clearInterval(interval);
  }, [isPaused, secondsRemaining, isBreak]);

  const handlePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const handleSkip = () => {
    setIsPaused(true);
    setIsBreak(!isBreak);
    setSecondsElapsed(0);
    setSecondsRemaining(isBreak ? 25 * 60 : 5 * 60); // Go to next phase
    setIntervalCount((intervalCount) => intervalCount + 1);
  };

  const minutes = Math.floor(secondsRemaining / 60);

  const handleCompleteTask = () => {
    const taskData = {
      intervalCount,
      secondsElapsed,
    };
    completeTask(task.id, taskData);
  };

  return (
    <Center pt="16">
      <VStack space="4">
        <Text fontSize={["50px", "30px", "38px", "40px"]} fontFamilt="Medium">
          {task.name}
        </Text>
        <Center>
          <Text fontSize={["50px", "50px", "58px", "60px"]}>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {secondsRemaining % 60 < 10
              ? `0${secondsRemaining % 60}`
              : secondsRemaining % 60}
          </Text>
          <Text fontSize={["10px", "14px", "20px", "20px"]} fontWeight="Light">
            {isBreak ? "Break Time!" : "Work Time!"}
          </Text>
        </Center>

        {!isBreak && (
          <Button onPress={handlePlayPause}>
            <Text fontSize={["10px", "24px", "24px", "30px"]}>
              {isPaused ? "Play" : "Pause"}
            </Text>
          </Button>
        )}
        {isBreak && (
          <Button onPress={handleCompleteTask}>
            <Text fontSize={["10px", "24px", "24px", "30px"]}>
              done with task
            </Text>
          </Button>
        )}
        <Button onPress={handleSkip}>
          <Text fontSize={["10px", "24px", "26px", "30px"]}>skip</Text>
        </Button>
        <Text fontSize="18px">{`interval ${intervalCount + 1}`}</Text>
      </VStack>
    </Center>
  );
};
