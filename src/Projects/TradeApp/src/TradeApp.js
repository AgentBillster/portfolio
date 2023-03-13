import React, { useContext, useEffect, useState } from "react";
import BottomTab from "./components/BottomTab";
import { VStack, Box, Text, HStack, Pressable, Center } from "native-base";
import SearchScreen from "./screens/TaskScreen";
import TaskScreen from "./screens/TaskScreen";
import TimerScreen from "./screens/TimerScreen";


const tabs = ['home', 'detail']

const TradeApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([
    {
      name: "Web Redesign",
      minutes: 60,
      completed: false
    },

    {
      name: "other thing",
      minutes: 30,
      completed: false
    },

    {
      name: "Style Portfolio",
      minutes: 120,
      completed: true
    }
  ])

  const addTask = (task) => {
    setTasks([...tasks, {
      name: "new Task",
      minutes: 120,
      completed: false
    }])
  }

  const handleTaskPress = (task) => {
    setSelectedTask(task);
    setActiveTab('detail');
  };

  const completeTask = (index) => {
    setTasks(prevTasks => {
      const task = prevTasks[index];
      task.completed = true;
      return [...prevTasks];
    });
    setActiveTab('home')
  }


  return (
    <Box position={"relative"} w={"100%"} h={"100%"}>
      <Box h={"90%"} bgColor={"white"}>
        {activeTab === 'home' ? <TaskScreen handleTaskPress={handleTaskPress} tasks={tasks} addTask={addTask} /> : <TimerScreen selectedTask={selectedTask} completeTask={completeTask} />}
      </Box>
      <HStack h={"10%"} bgColor={"white"} justifyContent="space-evenly">
        {tabs.map((item, i) => (
          <Pressable
            key={item}
            flex={1}
            fontSize={"lg"}
            fontFamily={"Thin"}
            onPress={() => setActiveTab(item)}
          >
            <Center flex={1} borderTopColor="grey" borderTopWidth={1}>
              {item}
            </Center>
          </Pressable>
        ))}
      </HStack>
    </Box>
  );
};

export default TradeApp;
