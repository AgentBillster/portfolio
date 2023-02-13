import { View, Text } from "react-native";
import React from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import { useSpringRef, useTransition, animated } from "@react-spring/web";
import { Dimensions } from "react-native";
import DeviceFrame from "../components/DeviceFrame";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ContactScreen = ({ style, pages }) => {
  return (
    <animated.div
      style={{
        ...style,
        height,
        width,
        background: "lightblue",
      }}
    >
      <DeviceFrame />
    </animated.div>
  );
};

export default ContactScreen;
