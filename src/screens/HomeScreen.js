import React, { useEffect, useState, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";

import SkillSection from "../components/SkillSection";
import AboutSection from "../components/AboutSection";

import { Dimensions } from "react-native";
import { useGesture, useDrag } from "@use-gesture/react";
import { Box, Text, VStack } from "native-base";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const sectionSize = height * 0.4;

const HomeScreen = ({ style }) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const scrollRef = useRef(null);

  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: { tension: 300, friction: 30 },
  }));

  const handleContainerHeight = (height) => {
    setContainerHeight(height);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      handleContainerHeight(container.getBoundingClientRect().height);
    }
  }, []);

  const bind = useDrag(
    ({ event, distance, offset: [, y] }) => {
      api.start({ y: y });
    },
    {
      bounds: {
        bottom: containerHeight - height * 0.9,
        top: -containerHeight,
      },

      rubberband: 0.9,
    }
  );

  return (
    <animated.div
      ref={scrollRef}
      {...bind()}
      style={{
        ...style,
        width: "100%",
        transform: y.to((y) => `translate3d(0,${y}px,0)`),
      }}
    >
      <VStack
        style={{
          boxShadow: "0px 0px 5px rgba(0,0,0,0 .3)",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: "lightblue",
        }}
      >
        <AboutSection
          style={{
            height: sectionSize,
          }}
        />
        <AboutSection
          style={{
            height: sectionSize,
          }}
        />
        <AboutSection
          style={{
            height: sectionSize,
          }}
        />
      </VStack>
    </animated.div>
    // </animated.div>
  );
};

export default HomeScreen;

{
  /* <ScrollView
  w={"35%"}
  height="100%"
  margin={"auto"}
  bg="white"
  showsVerticalScrollIndicator={false}
  p="3"
  contentContainerStyle={{
    alignItems: "center",
    boxShadow: "px 0px 5px rgba(255,255,255,0.8)",
    padding: "7px",
    borderRadius: 40,
  }}
>
  
</ScrollView> */
}
