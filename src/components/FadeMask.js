import { Box, useColorMode } from "native-base";
import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { useSpring, animated, useSpringValue } from "@react-spring/web";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const changeColorsToGradient = () => `linear-gradient(
  to top,
  rgba(0, 0, 0, 1) ,
  rgba(255, 255, 255, 1) 
)`;

const FadeMask = () => {
  const [{ background }, api] = useSpring(() => ({
    background: changeColorsToGradient("black"),
  }));

  return (
    <animated.div
      id="wrapper"
      className="wrapper"
      style={{
        background: background,
        position: "absolute",
        bottom: 0,
        width,
        height: 30,
        zIndex: 20,
      }}
    ></animated.div>
  );
};

export default FadeMask;
