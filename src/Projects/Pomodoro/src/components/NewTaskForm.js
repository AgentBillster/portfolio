import {
  Center,
  Text,
  Input,
  Box,
  HStack,
  Button,
  VStack,
  FormControl,
  Stack,
  WarningOutlineIcon,
  PresenceTransition,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskProvider";

export const NewTaskForm = ({ isOpen, onToggle }) => {
  const { addTask } = useContext(TaskContext);
  const [taskName, setTaskName] = useState("Hire Will");
  const [minutes, setMinutes] = useState(15);

  return (
    <PresenceTransition
      visible={isOpen}
      style={{
        position: "absolute",
        width: "100%",
        bottom: "0",
      }}
      initial={{
        translateY: 400,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,

        transition: {
          duration: 250,
          type: "spring",
          useNativeDriver: false,
        },
      }}
    >
      <VStack borderRadius={"20px"} p={"3"} bg="white" flex={1}>
        <Text mt={"2"} textAlign={"center"}>
          New Task
        </Text>

        <Box mt={"6"}>
          <Text>Name</Text>
          <Input value={taskName} onChangeText={(text) => setTaskName(text)} />
        </Box>

        <Box mt={"6"}>
          <Text>Select duration:</Text>
          <HStack space={2}>
            {[15, 30, 45, 60].map((m) => (
              <Button
                key={m}
                variant={minutes === m ? "solid" : "outline"}
                onPress={() => setMinutes(m)}
              >
                {`${m} min`}
              </Button>
            ))}
          </HStack>
        </Box>
        <Button
          mb={"4"}
          mt={"10"}
          onPress={() => {
            addTask(taskName, minutes);
            onToggle();
          }}
        >
          Add Task
        </Button>
      </VStack>
    </PresenceTransition>
  );
};
