import React from "react";
import { useColorMode } from "native-base";
import { useSpring, animated } from "@react-spring/web";

const AnimatedBackground = (props) => {
  const { colorMode } = useColorMode();

  const bg = useSpring({
    background: colorMode === "light" ? "rgb(230,230,230)" : "black",
  });

  return (
    <animated.div
      style={{
        ...bg,
        width: "100%",
        height: window.innerHeight,
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
