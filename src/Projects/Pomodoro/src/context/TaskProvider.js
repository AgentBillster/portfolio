import React, { useState } from "react";
import { useNavigation } from "../hooks/useNavigation";
import { TaskScreen } from "../screens/TaskScreen";
import { TimerScreen } from "../screens/TimerScreen";

export const PomoContext = React.createContext();

const data = [
  {
    name: "Web Redesign",
    minutes: 60,
    completed: false,
  },
  {
    name: "Finish Chapter 7",
    minutes: 60,
    completed: false,
  },
  {
    name: "write some code",
    minutes: 60,
    completed: false,
  },
  {
    name: "other thing",
    minutes: 30,
    completed: true,
  },
  {
    name: "Style Portfolio",
    minutes: 120,
    completed: true,
  },
  {
    name: "Style Portfolio",
    minutes: 120,
    completed: true,
  },
];

export const TaskProvider = (props) => {
  const [tasks, setTasks] = useState(data);

  const { getScreenComponent } = useNavigation("Tasks", {
    Tasks: TaskScreen,
    Timer: TimerScreen,
  });

  const addTask = (name, minutes) => {
    const newTask = {
      name: name,
      minutes: minutes,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

  return (
    <PomoContext.Provider value={{ tasks, addTask, completeTask }}>
      {props.children}
    </PomoContext.Provider>
  );
};
