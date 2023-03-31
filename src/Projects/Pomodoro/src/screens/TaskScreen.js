import React, { useEffect, useState } from "react";
import { NBaseHeader } from "../components/NBaseHeader";
import { NBaseTabs } from "../components/NBaseTabs";
import { NBaseList } from "../components/NBaseList";
import { NBaseForm } from "../components/NBaseForm";

export const TaskScreen = ({ activeScreen, navigateToScreen }) => {
  const [activeTab, setActiveTab] = useState("active");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("tasks");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    if (activeTab === "active") {
      setTasks(parsedData.filter((task) => !task.completed));
    } else {
      setTasks(parsedData.filter((task) => task.completed));
    }
  }, [tasks]);

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

  const completeTask = (id, taskData) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      console.warn("CANT FIND THAT MA BOI");
    }
    tasks[taskIndex].completed = true;
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
    }
  };

  return (
    <>
      <NBaseHeader title={activeScreen} />
      <NBaseTabs
        tabs={["active", "completed"]}
        activeTab={activeTab}
        handleTabToggle={handleTabToggle}
      />
      <NBaseList tasks={tasks} handleTaskPress={handleTaskPress} />
      <NBaseForm addTask={addTask} />
    </>
  );
};
