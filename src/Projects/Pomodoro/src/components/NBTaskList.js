import {
  Center,
  Text,
  Input,
  Box,
  HStack,
  Button,
  Skeleton,
  Pressable,
  VStack,
  Icon,
  ArrowForwardIcon,
  Badge,
  useDisclose,
  AddIcon,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskProvider";
import { NewTaskForm } from "./NewTaskForm";
import { ScrollViewPlus } from "./ScrollViewPlus";

export const NBTaskList = ({ tasks, navigateToScreen }) => {
  const { isOpen, onToggle } = useDisclose();
  return (
    <>
      <ScrollViewPlus>
        {tasks.map((task, i) => (
          <Pressable
            _hover={{
              bg: "gray.500",
            }}
            w="100%"
            borderWidth={1}
            onPress={() => {
              navigateToScreen("Timer");
            }}
            mt={4}
            px="8"
            py="4"
            borderRadius="6"
            key={i}
            flexDir="row"
            justifyContent={"space-between"}
          >
            <VStack>
              <Text>{task.name}</Text>
              <Text>{task.minutes} minutes</Text>
            </VStack>
            <ArrowForwardIcon size="7" />
          </Pressable>
        ))}
        <Button
          onPress={onToggle}
          mt="6"
          ml={"auto"}
          colorScheme="blueGray"
          size={"60px"}
          borderRadius="12"
          endIcon={<AddIcon size="8" />}
        />
      </ScrollViewPlus>
      {isOpen && <NewTaskForm isOpen={isOpen} onToggle={onToggle} />}
    </>
  );
};
