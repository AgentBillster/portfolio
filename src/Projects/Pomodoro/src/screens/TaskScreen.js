import {
  Center,
  SectionList,
  Box,
  Text,
  ArrowForwardIcon,
  Pressable,
  HStack,
  Button,
  Divider,
  PresenceTransition,
  useDisclose,
} from "native-base";

import React, { useContext, useEffect, useState } from "react";
import { NBaseHeader } from "../components/NBaseHeader";
import { NBaseTabBar } from "../components/NBaseTabBar";
import { NBTaskList } from "../components/NBTaskList";
import { TaskContext } from "../context/TaskProvider";

export const TaskScreen = ({ activeScreen }) => {
  const [activeTab, setActiveTab] = useState("active");
  const [filteredData, setFilteredData] = useState([]);
  const { isOpen, onToggle } = useDisclose();
  const { tasks } = useContext(TaskContext);

  const handleTabPress = (tab) => {
    if (tab === activeTab) {
      return console.warn("tab is already active");
    } else {
      setActiveTab(tab);
      onToggle();
    }
  };

  useEffect(() => {
    if (activeTab === "active") {
      setFilteredData(tasks.filter((task) => !task.completed));
    } else {
      setFilteredData(tasks.filter((task) => task.completed));
    }
  }, [tasks, activeTab]);

  return (
    <>
      <NBaseHeader title={activeScreen} />
        <NBaseTabBar tabs={["active", "completed"]} isOpen={isOpen} handleTabPress={handleTabPress} />
      <NBTaskList tasks={filteredData} />
    </>
  );
};
