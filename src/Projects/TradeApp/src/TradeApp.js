import React, { useContext, useEffect, useState } from "react";
import BottomTab from "./components/BottomTab";
import { VStack, Box, Text, HStack, Pressable, Center } from "native-base";
import Home from "./screens/Home";
import { View } from "react-native";

const tabs = ["home", "trade"];
const TradeApp = () => {
  const [activepage, setActivepage] = useState(tabs[0]);

  return (
    <Box position={"relative"} w={"100%"} h={"100%"}>
      <Box h={"90%"} bgColor={"white"}>
        Content here
      </Box>
      <HStack h={"10%"} bgColor={"white"} justifyContent="space-evenly">
        {tabs.map((item, i) => (
          <Pressable flex={1} fontSize={"lg"} fontFamily={"Thin"}>
            <Center flex={1} borderTopColor="grey" borderTopWidth={1}>
              {item}
            </Center>
          </Pressable>
        ))}
      </HStack>
    </Box>
  );
};

export default TradeApp;
