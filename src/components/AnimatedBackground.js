import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useColorMode } from "native-base";
import { useSpring, animated } from "@react-spring/web";
import "../index.css";

const AnimatedBackground = (props) => {
  const { colorMode } = useColorMode();

  const bg = useSpring({
    background: colorMode === "light" ? "#F9F9F8" : "rgb(20, 20, 20)",
    delay: 20,
    config: {
      duration: 300,
    },
  });

  return (
    <animated.div
      style={{
        ...bg,
        position: "fixed",
        zIndex: "-1",
        width: "100%",
        height: "100%",
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



