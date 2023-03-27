import React, { useEffect, useState } from "react";
import { NBaseHeader } from "../components/NBaseHeader";
import { NBaseTabBar } from "../components/NBaseTabBar";
import { NBaseList } from "../components/NBaseList";

import { useToggle } from "../hooks/useToggle";
import { NBaseAnimatedForm } from "../components/NBaseAnimatedForm";

export const TaskScreen = ({ activeScreen, navigateToScreen }) => {
  const [activeTab, setActiveTab] = useState("active");
  const [tasks, setTasks] = useState([]);
  const [isToggledOn, toggle] = useToggle();

  useEffect(() => {
    const storedData = localStorage.getItem("tasks");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    if (activeTab === "active") {
      setTasks(parsedData.filter((task) => !task.completed));
    } else {
      setTasks(parsedData.filter((task) => task.completed));
    }
  }, [tasks, activeTab]);

  const addTask = (name, minutes) => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const id = Math.max(...tasks.map((task) => task.id)) + 1;
    const newTask = {
      id: id,
      name: name,
      minutes: minutes,
      completed: false,
    };
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  const handleTaskPress = (task) => {
    if (task.completed) {
      deleteTask(task.id);
    } else {
      navigateToScreen("Timer", { task, completeTask });
    }
  };

  const completeTask = (id) => {
    // get data
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // get task we want to change via id
    const taskIndex = tasks.findIndex((task) => task.id === id);

    // if -1 then id is not in arr
    if (taskIndex === -1) {
      console.warn("CANT FIND THAT MA BOI");
    }

    // update task
    tasks[taskIndex].completed = true;

    // Update the tasks array in local storage with the updated tasks
    localStorage.setItem("tasks", JSON.stringify(tasks));
    navigateToScreen("Tasks");
  };

  const deleteTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleTabToggle = (tab) => {
    if (tab === activeTab) {
      return console.warn("tab is already active");
    } else {
      setActiveTab(tab);
      toggle();
    }
  };

  return (
    <>
      <NBaseHeader title={activeScreen} />
      <NBaseTabBar
        tabs={["active", "completed"]}
        isOpen={isToggledOn}
        handleTabToggle={handleTabToggle}
      />
      <NBaseList tasks={tasks} handleTaskPress={handleTaskPress} />
      <NBaseAnimatedForm addTask={addTask} />
    </>
  );
};
