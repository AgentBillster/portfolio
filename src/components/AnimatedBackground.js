import React, { useState, useEffect } from "react";
import { Box, Pressable, Switch, Text, useColorMode } from "native-base";

import { View } from "react-native";
import { useSpring, animated, useSpringValue } from "@react-spring/web";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AnimatedBackground = (props) => {
  const { colorMode } = useColorMode();

  const bg = useSpring({
    background: colorMode === "light" ? "rgb(230,230,230)" : "black",
  });

  return (
    <animated.div
      style={{
        ...bg,
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </animated.div>
  );
};

export default AnimatedBackground;
