import React, { useContext, useEffect, useState } from "react";
import BottomTab from "./components/BottomTab";
import { VStack, Box, Text, HStack, Pressable, Center } from "native-base";
import { TaskScreen } from "./screens/TaskScreen";
import { TimerScreen } from "./screens/TimerScreen";
import { useNavigation } from "./hooks/useNavigation";

const Pomodoro = () => {
  const screenMap = {
    Home: <TaskScreen />,
    Timer: <TimerScreen />,
    form: <New />,
  };

  const { activeScreen, navigateToScreen, getScreenComponent } = useNavigation(
    "Home",
    screenMap
  );

  return (
    <Box position={"relative"} w={"100%"} h={"100%"}>
      {getScreenComponent()}
    </Box>
  );
};

export default Pomodoro;
