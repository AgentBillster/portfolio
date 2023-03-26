import React, { useContext, useEffect, useState } from "react";
import { VStack, Box, Text, HStack, Pressable, Center } from "native-base";
import { TaskScreen } from "./screens/TaskScreen";
import { TimerScreen } from "./screens/TimerScreen";
import { useNavigation } from "./hooks/useNavigation";

const data = [
  {
    id: 2,
    name: "Web Redesign",
    minutes: 60,
    completed: false,
  },
  {
    id: 1,
    name: "Finish Chapter 7",
    minutes: 60,
    completed: false,
  },
  {
    id: 3,
    name: "write some code",
    minutes: 60,
    completed: false,
  },
  {
    id: 4,
    name: "other thing",
    minutes: 30,
    completed: true,
  },
  {
    id: 5,
    name: "Style Portfolio",
    minutes: 120,
    completed: true,
  },
  {
    id: 7,
    name: "Style Portfolio",
    minutes: 120,
    completed: true,
  },
];

const dataString = JSON.stringify(data);
localStorage.setItem("tasks", dataString);

const Pomodoro = () => {
  const { getScreenComponent } = useNavigation("Tasks", {
    Tasks: TaskScreen,
    Timer: TimerScreen,
  });

  return (
    <Box w={"100%"} h={"100%"}>
      {getScreenComponent()}
    </Box>
  );
};

export default Pomodoro;
