import {
  Text,
  Input,
  Box,
  HStack,
  Button,
  VStack,
  PresenceTransition,
  AddIcon,
} from "native-base";
import React, { useState } from "react";
import { useToggle } from "../hooks/useToggle";

export const NBaseAnimatedForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState("Hire Will");
  const [minutes, setMinutes] = useState(15);
  const [isToggledOn, toggle] = useToggle();

  if (isToggledOn) {
    return (
      <PresenceTransition
        visible
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
            <Input
              value={taskName}
              onChangeText={(text) => setTaskName(text)}
            />
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
              toggle();
            }}
          >
            Add Task
          </Button>
        </VStack>
      </PresenceTransition>
    );
  } else {
    return (
      <Button
        position={"absolute"}
        right="4px"
        bottom="4px"
        p={"5"}
        borderRadius={"10"}
        endIcon={<AddIcon size="6" />}
        onPress={toggle}
      />
    );
  }
};
