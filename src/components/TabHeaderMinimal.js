import { View, Text } from "react-native";
import React from "react";
import { Button, HStack, Pressable, useColorMode } from "native-base";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const TabHeaderMinimal = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack w={width}>
      <Pressable w="10" h="10" bg={"gray.300"} onPress={toggleColorMode} />
    </HStack>
  );
};

export default TabHeaderMinimal;
