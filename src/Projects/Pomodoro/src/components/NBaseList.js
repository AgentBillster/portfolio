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
import { useToggle } from "../hooks/useToggle";
import { NewTaskForm } from "./NBaseAnimatedForm";
import { ScrollViewPlus } from "./ScrollViewPlus";

export const NBaseList = ({ tasks, handleTaskPress }) => {
  const [isToggledOn, toggle] = useToggle();
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
              handleTaskPress(task);
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
      </ScrollViewPlus>
    </>
  );
};
