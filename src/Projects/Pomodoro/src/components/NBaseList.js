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
            px="6"
            alignItems={"center"}
            py="4"
            borderRadius="6"
            key={i}
            flexDir="row"
            justifyContent={"space-between"}
          >
            <VStack>
              <Text color="black" fontSize={["10px", "20px", "30px", "32px"]}>
                {task.name}
              </Text>
              <Text color="black" fontSize={["10px", "20px", "24px", "28px"]}>
                {`${task.minutes / 25} ${
                  task.minutes === 25 ? "interval" : "intervals"
                }`}
              </Text>
            </VStack>
            {!task.completed ? (
              <ArrowForwardIcon size={["0px", "20px", "30px", "46px"]} />
            ) : (
              <DeleteIcon size={["0px", "20px", "30px", "46px"]} />
            )}
          </Pressable>
        ))}
      </ScrollViewPlus>
    </>
  );
};
