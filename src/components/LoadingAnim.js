import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Center, HStack, Text } from "native-base";

export const LoadingAnim = () => {
  const [showComponent, setShowComponent] = useState(true);

  const textOpacity = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0 },
    delay: 1800,
  });

  const textOpacityDel = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0 },
    delay: 2000,
  });

  const screenOpacity = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0 },
    delay: 2500,
    onRest: () => {
      setShowComponent(false);
    },
  });

  if (!showComponent) {
    return null; // return null to unmount the component
  }

  return (
    <animated.div
      style={{
        ...screenOpacity,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(230,230,230)",
        zIndex: "2",
      }}
    >
      <Center h="full">
        <HStack alignItems={"center"} space={"2"}>
          <animated.div style={textOpacity}>
            <Text
              fontFamily={"Light"}
              fontSize="30"
              style={{
                color: "black",
              }}
            >
              william Wilson
            </Text>
          </animated.div>
          <animated.div style={textOpacityDel}>
            <Text
              fontSize="30"
              fontFamily={"Thin"}
              style={{
                color: "black",
              }}
            >
              Portfolio
            </Text>
          </animated.div>
        </HStack>
      </Center>
    </animated.div>
  );
};
