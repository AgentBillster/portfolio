import React, { useState, useEffect } from "react";
import { Box, Pressable, Switch, Text, useColorMode } from "native-base";

import { View } from "react-native";
import { useSpring, animated, useSpringValue } from "@react-spring/web";

const AnimatedBackground = () => {
  const { colorMode } = useColorMode();

  const bg = useSpring({
    background: colorMode === "light" ? "white" : "#202023",
  });

  return (
    <animated.div
      style={{
        ...bg,
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default AnimatedBackground;
