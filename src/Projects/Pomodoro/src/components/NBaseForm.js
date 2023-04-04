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

export const NBaseForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState("Hire Will ;)");
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
          <Text color="black" mt={"2"} textAlign={"center"}>
            New Task
          </Text>

          <Box mt={"6"}>
            <Text color="black">Title</Text>
            <Input
              color="black"
              value={taskName}
              borderWidth="0"
              outlineStyle="none"
              onChangeText={(text) => setTaskName(text)}
              style={{
                border: "1px solid black",
              }}
            />
          </Box>

          <Box mt={"6"}>
            <Text color="black">Select duration:</Text>
            <HStack w="100%" space={2}>
              {[25, 50, 75, 100].map((m) => (
                <Button
                  flex="1"
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
        size={["8", "16", "20", "24"]}
        borderRadius={"10"}
        endIcon={<AddIcon size="6" />}
        onPress={toggle}
      />
    );
  }
};
