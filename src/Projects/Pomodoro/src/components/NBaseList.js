import {
  Text,
  Pressable,
  VStack,
  ArrowForwardIcon,
  DeleteIcon,
} from "native-base";
import React from "react";
import { ScrollViewPlus } from "./ScrollViewPlus";

export const NBaseList = ({ tasks, handleTaskPress }) => {
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
            alignItems={"center"}
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
            {!task.completed ? (
              <ArrowForwardIcon size="7" />
            ) : (
              <DeleteIcon size="7" />
            )}
          </Pressable>
        ))}
      </ScrollViewPlus>
    </>
  );
};
