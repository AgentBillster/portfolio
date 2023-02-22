import React from "react";
import { VStack, Text, HStack } from "native-base";

const HomeHeader = () => {
  return (
    <VStack mt={"5%"} w="100%">
      <Text fontFamily={"Book"} fontSize={"70"} letterSpacing="16">
        WILLIAM WILSON
      </Text>

      <Text fontFamily={"thin"} fontSize={"45"}>
        Fullstack Web Developer
      </Text>
    </VStack>
  );
};

export default HomeHeader;
