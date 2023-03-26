import React, { useContext, useEffect, useState } from "react";
import { VStack, Box, Text, HStack, Pressable, Center } from "native-base";
import { TaskScreen } from "./screens/TaskScreen";
import { TimerScreen } from "./screens/TimerScreen";
import { useNavigation } from "./hooks/useNavigation";
import { NewTaskForm } from "./components/NewTaskForm";
import { TaskProvider } from "./context/TaskProvider";

const Pomodoro = () => {
  const { getScreenComponent } = useNavigation("Tasks", {
    Tasks: TaskScreen,
    Timer: TimerScreen,
  });

  return (
    <TaskProvider>
      <Box w={"100%"} h={"100%"}>
        {getScreenComponent()}
      </Box>
    </TaskProvider>
  );
};

export default Pomodoro;
