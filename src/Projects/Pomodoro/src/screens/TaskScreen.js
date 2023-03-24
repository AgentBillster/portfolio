import {
  Center,
  SectionList,
  Box,
  Text,
  AddIcon,
  ArrowForwardIcon,
  Pressable,
} from "native-base";
import { PanResponder, ScrollView } from "react-native";

import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import useMeasure from "react-use-measure";
import React, { useRef } from "react";
import { useState } from "react";

const SPACING = 8; // spacing between items
const ITEM_HEIGHT = 48; // height of each item
const ADD_BUTTON_SIZE = 40; // size of the add button

export const TaskScreen = ({}) => {
  const scrollViewRef = useRef(null);
  const [previousY, setPreviousY] = useState(0);

  const handlePanResponderMove = (evt, gestureState) => {
    const { dy } = gestureState;
    const newScrollY = previousY - dy;
    scrollViewRef.current.scrollTo({ y: newScrollY, animated: false });
  };

  const handlePanResponderRelease = (evt, gestureState) => {
    const { dy } = gestureState;
    const prev = previousY - dy;

    setPreviousY(prev < 0 ? 0 : prev);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
  });
  const [tasks, setTasks] = useState([
    {
      name: "Web Redesign",
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
  ]);
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = (task) => {
    setTasks([
      ...tasks,
      {
        name: "new Task",
        minutes: 120,
        completed: false,
      },
    ]);
  };

  // const handleTaskPress = (task) => {
  //   if (!task.completed) {
  //     setSelectedTask(task);
  //     // setActiveTab("detail");
  //   } else {
  //     console.log("task is completed");
  //   }
  // };

  // const completeTask = (index) => {
  //   setTasks((prevTasks) => {
  //     const task = prevTasks[index];
  //     task.completed = true;
  //     return [...prevTasks];
  //   });
  //   // setActiveTab("home");
  // };

  // Add an extra item to the "Active" section to represent the "Add task" button
  const activeTasks = [...tasks.filter((item) => !item.completed)];
  const data = [
    {
      title: "Active",
      data: [...activeTasks, { name: "Add task", isAddButton: true }],
    },
    {
      title: "Completed",
      data: [...tasks.filter((item) => item.completed)],
    },
  ];

  return (
    <ScrollView ref={scrollViewRef} {...panResponder.panHandlers}>
      <Pressable
        onPress={addTask}
        borderRadius={"2"}
        bg={"lightBlue.400"}
        w="40px"
        h="40px"
      >
        <AddIcon m="auto" flex="1" size="4" color="muted.600" />
      </Pressable>

      <Box p="8px">
        <SectionList
          w="100%"
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index, section }) =>
            item.isAddButton ? (
              <Pressable
                onPress={addTask}
                borderWidth={1}
                p="4"
                my={"2"}
                flexDirection={"row"}
              >
                <Box flex={1}>
                  <Text>{item.name}</Text>
                </Box>
                <Center>
                  {section.title === "Active" && (
                    <AddIcon size="5" color="muted.600" />
                  )}
                </Center>
              </Pressable>
            ) : (
              <Pressable
                // onPress={() => handleTaskPress()}
                borderWidth={1}
                p="4"
                my={"2"}
                flexDirection={"row"}
              >
                <Box flex={1}>
                  <Text>{item.name}</Text>
                  <Text>{item.minutes} minutes</Text>
                </Box>
                <Center>
                  {section.title === "Active" && (
                    <ArrowForwardIcon size="5" color="muted.600" />
                  )}
                </Center>
              </Pressable>
            )
          }
          renderSectionHeader={({ section: { title } }) => (
            <Text fontSize="xl" mt="8" pb="4">
              {title}
            </Text>
          )}
        />
      </Box>
    </ScrollView>
    // </animated.div>
  );
};
