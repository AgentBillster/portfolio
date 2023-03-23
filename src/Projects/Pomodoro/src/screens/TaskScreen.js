import {
  Center,
  Heading,
  SectionList,
  Box,
  Text,
  VStack,
  Fab,
  Button,
  HStack,
  AddIcon,
  ArrowForwardIcon,
  Pressable,
} from "native-base";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import useMeasure from "react-use-measure";
import React from "react";
import { useState } from "react";

const SPACING = 8; // spacing between items
const ITEM_HEIGHT = 48; // height of each item
const ADD_BUTTON_SIZE = 40; // size of the add button

export const TaskScreen = ({}) => {
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

  // const addTask = (task) => {
  //   setTasks([
  //     ...tasks,
  //     {
  //       name: "new Task",
  //       minutes: 120,
  //       completed: false,
  //     },
  //   ]);
  // };

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

  const [ref, { height }] = useMeasure();
  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: { tension: 300, friction: 30 },
  }));

  const numTasks = tasks.length;

  const bounds = {
    top: (ITEM_HEIGHT + SPACING) * numTasks - height,
    bottom: 0,
  };

  const bind = useDrag(
    ({ event, distance, offset: [, y] }) => {
      api.start({ y: y });
    },
    {
      bounds: bounds,
      rubberband: 0.2,
    }
  );

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
    <animated.div
      {...bind()}
      style={{
        width: "100%",
        transform: y.to((y) => `translate3d(0,${y}px,0)`),
      }}
    >
      <Pressable
        // onPress={addTask}
        borderRadius={"2"}
        bg={"lightBlue.400"}
        w="40px"
        h="40px"
      >
        <AddIcon m="auto" flex="1" size="4" color="muted.600" />
      </Pressable>

      <Box ref={ref} p="8px">
        <SectionList
          w="100%"
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index, section }) =>
            item.isAddButton ? (
              <Pressable borderWidth={1} p="4" my={"2"} flexDirection={"row"}>
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
                // onPress={() => handleTaskPress(item)}
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
    </animated.div>
  );
};
