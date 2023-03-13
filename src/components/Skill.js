import { View, Text } from "react-native";
import React from "react";
import { HStack, VStack, Heading, Center, Image, Divider } from "native-base";

const Skill = ({ category, skills }) => {

  return (
    <VStack w={300} h="75" borderWidth={1}>
      <Text>{category}</Text>
      <Text></Text>
    </VStack>
  );
};

export default Skill;
