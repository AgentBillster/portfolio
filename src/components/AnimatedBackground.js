import React from "react";
import { useColorMode } from "native-base";
import { useSpring, animated } from "@react-spring/web";
import { Dimensions } from "react-native";

const AnimatedBackground = (props) => {
  const { colorMode } = useColorMode();

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const bg = useSpring({
    background: colorMode === "light" ? "rgb(230,230,230)" : "rgb(32,32,32)",
    width: `${screenWidth}px`,
    height: `${screenHeight}px`,
  });

  return (
    <animated.div
      style={{
        ...bg,
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
