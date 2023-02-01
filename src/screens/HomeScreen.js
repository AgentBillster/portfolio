import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Center,
  Container,
  Divider,
  Text,
  VStack,
  ScrollView,
  useColorMode,
  View,
} from "native-base";
import { Dimensions } from "react-native";
import { useSpring, animated, useSpringValue } from "@react-spring/web";
import AnimatedCursor from "react-animated-cursor";
import AnimatedBackground from "../components/AnimatedBackground";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const itemHeight = height / 5;

const HomeScreen = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartY(event.clientY);
    setStartScrollTop(scrollRef.current.scrollTop);
  };

  const handleMouseUp = (event) => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const diff = event.clientY - startY;
    scrollRef.current.scrollTop = startScrollTop - diff;
  };

  return (
    <View
      alignSelf={"center"}
      style={{
        width: 600,
        height: "100%",
        position: "fixed",
        zIndex: 100,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      
    >
      <AnimatedBackground />
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        {[...Array(15).keys()].map((item, index) => (
          <Box height={itemHeight}>
            <Text color={"black"}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </Box>
        ))}
        {/* <FadeMask />; */}
      </ScrollView>
      <AnimatedCursor />
    </View>
  );
};

export default HomeScreen;

{
  /* <animated.div
style={{
  ...bg,
  alignSelf: "center",
}}
> */
}
