import React, { useState, useEffect } from "react";
import { Box, Pressable, Switch, Text, useColorMode } from "native-base";

import { View } from "react-native";
import { useSpring, animated, useSpringValue } from "@react-spring/web";

const AnimatedBackground = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);

  const colorvalue = useSpringValue();

  const spring1 = useSpring({
    background: colorMode === "light" ? "" : "black",
  });

  const handleToggle = () => {
    toggleColorMode();
    // colorMode === "light" ? colorvalue.start(1) : colorvalue.start(0);
  };

  return (
    <>
      <Switch
        position={"fixed"}
        zIndex="100"
        defaultIsChecked={true}
        onValueChange={handleToggle}
      />
      <animated.div
        style={{
          // backgroundColor: colorvalue.to([0, 1], ["white", "black"]),
          // background: colorMode === "light" ? "blue" : "red",
          ...spring1,
          height: 200,
          width: 600,
          opacity: 0.6,
          position: "absolute",
          zIndex: 1,
        }}
      />
    </>
  );
};

export default AnimatedBackground;
