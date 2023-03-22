import { View, Text } from "react-native";
import React from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import { useSpringRef, useTransition, animated } from "@react-spring/web";
import { Dimensions } from "react-native";
import "react-device-frameset/styles/marvel-devices.min.css";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ContactScreen = ({ style, pages }) => {
  return (
    <animated.div
      style={{
        ...style,
        height,
        width,
      }}
    >
      
    </animated.div>
  );
};

export default ContactScreen;
