import React, { useEffect, useState, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
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
  Button,
  TextArea,
  PlayIcon,
  Badge,
} from "native-base";
import useMeasure from "react-use-measure";
import { GitIcon, LinkedInIcon, MailIcon } from "../assets/icons/icons";

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
        paddingBlock: "3%",
        paddingInline: "5%",
        transform: y.to((y) => `translate3d(0,${y}px,0)`),
      }}
    >
      <VStack>
        <Text variant="bigtext">William Wilson</Text>
        <Text variant="bigsubtext">Fullstack Web Developer</Text>
      </VStack>

      <HStack space={12} mt={"10"}>
        <HStack space={2} alignItems={"center"}>
          <Box>
            <MailIcon />
          </Box>

          <VStack>
            <Text>Gmail</Text>
            <Text _light={{ color: "muted.600" }}>
              william.z.wilson95@gmail.com
            </Text>
          </VStack>
        </HStack>

        <HStack space={2} alignItems={"center"}>
          <Box>
            <GitIcon />
          </Box>

          <VStack>
            <Text>Github</Text>
            <Text _light={{ color: "muted.600" }}>AgentBillster</Text>
          </VStack>
        </HStack>

        <HStack space={2} alignItems={"center"}>
          <Box>
            <LinkedInIcon />
          </Box>

          <VStack>
            <Text>Linkedin</Text>
            <Text _light={{ color: "muted.600" }}>William_wilson95</Text>
          </VStack>
        </HStack>

        <Image
          position={"absolute"}
          right="100"
          bottom="-20"
          source={require("../assets/images/me.jpg")}
          alt="Alternate Text"
          size={["150px", "160px", "170px", "180px"]}
          borderRadius={"20"}
        />
      </HStack>

      <Divider bgColor="grey" zIndex="-1" />
      {/* <Divider mt={"1px"} zIndex="-1" borderWidth="1" /> */}

      <HStack w={"70%"} mt={"40px"} alignItems={"baseline"} space="5">
        <Box>
          <Heading variant={"bioheader"}>Bio</Heading>
          <Divider mt={""} bgColor="black" zIndex="-1" />
          <Divider mt={"1px"} zIndex="-1" borderWidth="1" />
        </Box>
        <Text variant={"biotext"}>
          As a Full Stack React Native/ReactJS Engineer, I've learned the ropes
          through hands-on experience and plenty of self-teaching. I got my
          start with the Lambda program, but I've been building and tinkering
          ever since. I'm always looking for ways to push the boundaries with
          innovative solutions and fresh ideas. And with a easygoing demeanor
          and strong communication skills, I'm a great collaborator and teammate
        </Text>
      </HStack>

      <VStack w={"70%"} mt={"40px"} alignItems={"baseline"} space="5">
        <Box>
          <Heading variant={"bioheader"}>Education</Heading>
          <Divider mt={""} bgColor="black" zIndex="-1" />
          <Divider mt={"1px"} zIndex="-1" borderWidth="1" />
        </Box>

        <VStack>
          <Text>
            Bloom Institite Of technology
            <Text>/ Las Vegas / 2018 - 2019 </Text>
          </Text>

          <Text mt={"10px"}>
            A rigorous 9-month web development program that emphasized
            practical, hands-on learning to improve my skills as both a
            developer and team player. Here is the tech we worked with.
          </Text>

          <HStack mt={"2"} space={"8"}>
            <VStack>
              <Badge>HTML</Badge>
              {"\n"}
              <Badge>CSS</Badge>
            </VStack>
            <VStack>
              <Badge>Javascript</Badge>
              {"\n"}
              <Badge>React.js</Badge>
            </VStack>
            <VStack>
              <Badge>Java</Badge>
              {"\n"}
              <Badge>Spring</Badge>
            </VStack>
          </HStack>
        </VStack>
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
