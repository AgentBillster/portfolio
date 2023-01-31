import { Box } from "native-base";
import React from "react";
import { Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-web-linear-gradient";

const FadeMask = ({ height }) => {
  return (
    <LinearGradient
      colors={["#ffffff00", "white"]}
      style={{
        position: "absolute",
        height: 100,
        width: "100%",
        // border: "1px solid black",
        bottom: 0,
      }}
    ></LinearGradient>
  );
};

export default FadeMask;
