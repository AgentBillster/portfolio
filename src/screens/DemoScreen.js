import React from "react";
import { animated } from "@react-spring/web";
import { HStack, Box, Center, Text, Heading } from "native-base";
import TradeApp from "./../Projects/TradeApp/src/TradeApp";
import { TreeNav } from "../navigators/TreeNav";

const DemoScreen = ({ style, data }) => {
  data && console.log(data);
  return (
    <animated.div
      style={{
        ...style,
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <Box bg={"#2d2d30"} flex={0.19}>
        <TreeNav />
      </Box>

      <Center flex={0.4}>
        <Heading>code for app goes here</Heading>
      </Center>

      <Center flex={0.4}>
        <div className="iphone-x">
          <i></i>
          <TradeApp />
        </div>
      </Center>
    </animated.div>
  );
};

export default DemoScreen;
{
  /* <Box w={'375'} h='812'>
      </Box> */
}
