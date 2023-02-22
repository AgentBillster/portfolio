import React, { useContext } from "react";
import {
  HStack,
  Button,
  VStack,
  Text,
  Heading,
  Box,
  Pressable,
} from "native-base";

const BottomTab = ({ tabs }) => {
  return (
    <HStack position={"relative"} w={375} top="690" borderWidth={1} p={6}>
      {tabs.map((item, i) => (
        <Text fontSize={"lg"} fontFamily={"Thin"}>
          {item}
        </Text>
      ))}
    </HStack>
  );
};

export default BottomTab;
