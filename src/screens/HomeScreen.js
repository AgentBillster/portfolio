import React, { useEffect, useState, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";

import SkillSection from "../components/SkillSection";

import { Dimensions } from "react-native";
import { useGesture, useDrag } from "@use-gesture/react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Center,
  Image,
  Heading,
  Divider,
  TextArea,
} from "native-base";
import useMeasure from "react-use-measure";
import HomeHeader from "./../components/HomeHeader";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const HomeScreen = ({ style }) => {
  const [ref, { height }] = useMeasure();
  const scrollRef = useRef(null);

  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: { tension: 300, friction: 30 },
  }));

  const bind = useDrag(
    ({ event, distance, offset: [, y] }) => {
      api.start({ y: y });
    },
    {
      // bounds: {
      //   bottom: 0,
      //   top: -height + 600,
      // },

      rubberband: 0.9,
    }
  );

  return (
    <animated.div
      {...bind()}
      style={{
        ...style,
        width: "100%",
        transform: y.to((y) => `translate3d(0,${y}px,0)`),
      }}
    >
      <VStack ref={ref} w="50%" margin="auto">
        <HomeHeader />
        <Image
          position={"fixed"}
          right="20%"
          top="14%"
          source={require("../assets/images/me.jpg")}
          alt="Alternate Text"
          size="230px"
          borderRadius={"40"}
        />
        <Divider
          bgColor={"black"}
          alignSelf="center"
          mt={"5%"}
          w="170%"
          zIndex="-1"
        />

        <HStack mt={"50"}>
          <Text fontSize={"20px"} flex={0.1}>
            Bio
          </Text>
          <Box
            _text={{
              fontSize: "20px",
              lineHeight: "25px",
            }}
            flex={0.6}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Box>
        </HStack>
        <HStack mt={"50"}>
          <Text fontSize={"20px"} flex={0.1}>
            Bio
          </Text>
          <Box
            _text={{
              fontSize: "20px",
              lineHeight: "25px",
            }}
            flex={0.6}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Box>
        </HStack>
        <HStack mt={"50"}>
          <Text fontSize={"20px"} flex={0.1}>
            Bio
          </Text>
          <Box
            _text={{
              fontSize: "20px",
              lineHeight: "25px",
            }}
            flex={0.6}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Box>
        </HStack>
        <HStack mt={"50"}>
          <Text fontSize={"20px"} flex={0.1}>
            Bio
          </Text>
          <Box
            _text={{
              fontSize: "20px",
              lineHeight: "25px",
            }}
            flex={0.6}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Box>
        </HStack>
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
