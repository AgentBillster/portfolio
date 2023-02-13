import React from "react";
import { HStack, Pressable, VStack, Text, Heading, Box } from "native-base";
import { Dimensions } from "react-native";
import { useTransition } from "@react-spring/web";
import TreeNav from "./TreeNav";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AnimatedNavPanel = ({ pages, onPress, isAnimated }) => {
  return (
    <Box h="100%" w={"20%"} bg={"white"} p={6}>
      <VStack mt={6}>
        {pages.map((item, i) => (
          <Pressable
            key={item}
            onPress={() => {
              onPress(item);
            }}
          >
            <Text fontSize="220%" fontFamily={"Thin"}>
              {item}
            </Text>
          </Pressable>
        ))}
      </VStack>
    </Box>
  );
};

export default AnimatedNavPanel;
