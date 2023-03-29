import React, { useContext, useState, useLayoutEffect } from "react";
import {
  HStack,
  useBreakpointResolvedProps,
  useBreakpointValue,
} from "native-base";
import AnimatedNavPanel from "./navigators/AnimatedNavPanel";
import AnimatedCursor from "react-animated-cursor";
import { Dimensions } from "react-native";
import { NavContext } from "./providers/NavigationProvider";
import AnimatedBackground from "./components/AnimatedBackground";
const { width, height } = Dimensions.get("screen");

const App = () => {
  const { transitions, getPage } = useContext(NavContext);

  return (
    <AnimatedBackground>
      <AnimatedCursor />
      <HStack
        w={"90%"}
        h={"90%"}
        borderWidth="1"
        borderColor="rgba(80,80,80, 0.9)"
        borderRadius={5}
        overflow={"hidden"}
      >
        <AnimatedNavPanel />
        {transitions((style, item) => getPage(item, style))}
      </HStack>
    </AnimatedBackground>
  );
};

export default App;
