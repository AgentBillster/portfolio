import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Dimensions } from "react-native-web";
import { useColorMode } from "native-base";

const AnimatedBackground = (props) => {
  const { colorMode } = useColorMode();

  const [windowSize, setWindowSize] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bg = useSpring({
    background: colorMode === "light" ? "rgb(230,230,230)" : "rgb(32,32,32)",
    width: `${windowSize.width}px`,
    height: `${windowSize.height}px`,
  });

  return (
    <animated.div
      style={{
        ...bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {props.children}
    </animated.div>
  );
};

export default AnimatedBackground;
