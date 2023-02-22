import React from "react";
import { animated } from "@react-spring/web";
import { HStack, Box, Center } from "native-base";
import TradeApp from "./../Projects/TradeApp/src/TradeApp";
import DFrame from "../components/DFrame";

const DemoScreen = ({ style }) => {
  return (
    <animated.div
      style={{
        ...style,
        height: "100%",
        width: "100%",
      }}
    >
      <DFrame>
        <TradeApp />
      </DFrame>
    </animated.div>
  );
};

export default DemoScreen;
// h={812} w={375}
