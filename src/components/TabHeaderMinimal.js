import { View, Text } from "react-native";
import React from "react";
import { Button, HStack, Pressable, useColorMode } from "native-base";
import { Dimensions } from "react-native";
import { useSpring, animated, useSpringValue } from "@react-spring/web";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const TabHeaderMinimal = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorvalue = useSpringValue();

  const bg = useSpring({
    background: colorMode === "light" ? "white" : "#202023",
  });

  return (
    <animated.div
      style={{
        ...bg,
      }}
    >
      <HStack w={width}>
        <Pressable w="50" h="10" onPress={toggleColorMode} />
      </HStack>
    </animated.div>
  );
};

export default TabHeaderMinimal;
