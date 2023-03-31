import React from "react";
import { Box } from "native-base";
import { TaskScreen } from "./screens/TaskScreen";
import { TimerScreen } from "./screens/TimerScreen";
import { useNavigation } from "./hooks/useNavigation";

const data = [
  {
    id: 2,
    name: "Read Chapter 7",
    minutes: 25,
    completed: false,
  },
  {
    id: 1,
    name: "Code Something",
    minutes: 75,
    completed: false,
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
    <Box bg="white" w={"100%"} h={"100%"}>
      {getScreenComponent()}
    </Box>
  );
};

export default Pomodoro;

// do more stuff with timer screen.
//  keep count of how many session the user does and how much time and then when object
// is completed add a property that displays that information
