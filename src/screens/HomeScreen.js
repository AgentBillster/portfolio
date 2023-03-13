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
        transform: y.to((y) => `translate3d(0,${y}px,0)`),
      }}
    >
      <VStack ref={ref} w="50%" margin="auto" >

        <VStack mt={"5%"} >
          <Text fontFamily={"Book"} fontSize={"65"} letterSpacing="14">
            WILLIAM WILSON
          </Text>
          <Text fontFamily={"thin"} fontSize={"50"}>
            Fullstack Web Developer
          </Text>
        </VStack>

        <HStack space={12} mt={'12'} alignItems="center" >
          <HStack alignItems={'center'}>
            <Box>
              <MailIcon size="60px" />
            </Box>

            <VStack >
              <Text>Gmail</Text>
              <Text _light={{ color: "muted.600" }}>william.z.wilson95@gmail.com</Text>
            </VStack>
          </HStack>

          <HStack alignItems={'center'}>
            <Box>
              <GitIcon size="60px" />
            </Box>

            <VStack>
              <Text>Github</Text>
              <Text _light={{ color: "muted.600" }}>AgentBillster</Text>
            </VStack>
          </HStack>

          <HStack alignItems={'center'}>
            <Box>
              <LinkedInIcon size="60px" />
            </Box>

            <VStack>
              <Text>Linkedin</Text>
              <Text _light={{ color: "muted.600" }}>William_wilson95</Text>
            </VStack>
          </HStack>
        </HStack>

        <Divider
          bgColor={"black"}
          alignSelf="center"
          w="150%"
          zIndex="-1"
        />

        <Image
          position={"fixed"}
          right="21%"
          top="20%"
          source={require("../assets/images/me.jpg")}
          alt="Alternate Text"
          size="235px"
          borderRadius={"20"}
        />


        <HStack mt={"50"} space="4" >
          <Text fontSize={"30px"} flex={0.1}>
            Bio
          </Text>
          <Box
            _text={{
              fontSize: "20px",
              lineHeight: "25px",
            }}
            flex={0.6}
          >
            As a self-taught Full Stack React Native/ReactJS Engineer, I take great pride in my unwavering commitment to
            learning and the pursuit of knowledge. With a passion for developing cutting-edge solutions, I have honed
            my skills to become a highly skilled and efficient worker. With a keen eye for detail and a deep
            understanding of the latest technologies
          </Box>
        </HStack>


        <HStack mt={"60"}>
          <Text fontSize={"30px"} flex={0.1}>
            Education
          </Text>
          <Box
            _text={{
              fontSize: "20px",
              lineHeight: "25px",
            }}
            flex={0.6}
          >
            something institute of technology
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
