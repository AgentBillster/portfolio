import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Divider,
  IconButton,
  ArrowUpIcon,
  Image,
} from "native-base";
import useMeasure from "react-use-measure";
import { GitIcon, LinkedInIcon, MailIcon } from "../assets/icons/icons";

const HomeScreen = ({ style }) => {
  const [ref, { height }] = useMeasure();

  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: { tension: 300, friction: 30 },
  }));

  const bind = useDrag(
    ({ offset: [, y] }) => {
      api.start({ y: y });
    },
    {
      bounds: {
        bottom: height,
      },

      rubberband: 0.9,
    }
  );

  return (
    <animated.div
      {...bind()}
      ref={ref}
      style={{
        ...style,
        width: "100%",
        paddingBlock: "4%",
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
          <IconButton
            size="6"
            colorScheme={"coolGray"}
            variant={"outline"}
            p="1"
            icon={<ArrowUpIcon />}
            top={-10}
            style={{
              transform: "rotate(45deg)",
            }}
            onPress={() => window.open("https://www.gmail.com", "_blank")}
          />
        </HStack>

        <HStack space={2} alignItems={"center"}>
          <Box>
            <GitIcon />
          </Box>

          <VStack>
            <Text>Github</Text>
            <Text _light={{ color: "muted.600" }}>AgentBillster</Text>
          </VStack>
          <IconButton
            size="6"
            colorScheme={"coolGray"}
            variant={"outline"}
            p="1"
            icon={<ArrowUpIcon />}
            top={-10}
            style={{
              transform: "rotate(45deg)",
            }}
            onPress={() =>
              window.open("https://www.github.com/agentbillster", "_blank")
            }
          />
        </HStack>

        <HStack space={2} alignItems={"center"}>
          <Box>
            <LinkedInIcon />
          </Box>

          <VStack>
            <Text>Linkedin</Text>
            <Text _light={{ color: "muted.600" }}>William_wilson95</Text>
          </VStack>
          <IconButton
            size="6"
            colorScheme={"coolGray"}
            variant={"outline"}
            p="1"
            icon={<ArrowUpIcon />}
            top={-10}
            style={{
              transform: "rotate(45deg)",
            }}
            onPress={() =>
              window.open(
                "https://www.linkedin.com/in/agentbillster/",
                "_blank"
              )
            }
          />
        </HStack>

        <Image
          position={"absolute"}
          right="100"
          bottom="-50"
          borderWidth={1}
          borderColor="rgba(80,80,80, 0.7)"
          source={require("../assets/images/me.jpg")}
          alt="Alternate Text"
          size={["150px", "160px", "200px", "230px"]}
          borderRadius={"20"}
        />
      </HStack>

      <Divider bgColor="grey" zIndex="-1" />
      {/* <Divider mt={"1px"} zIndex="-1" borderWidth="1" /> */}

      <VStack w={"70%"} mt={"40px"} alignItems={"baseline"} space="5">
        <Box>
          <Heading variant={"bioheader"}>Bio</Heading>
          <Divider
            _dark={{
              bgColor: "white",
            }}
            bgColor="black"
            zIndex="-1"
          />
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
      </VStack>

      <VStack w={"70%"} mt={"40px"} alignItems={"baseline"} space="5">
        <Box>
          <Heading variant={"bioheader"}>Education</Heading>
          <Divider
            _dark={{
              bgColor: "white",
            }}
            bgColor="black"
            zIndex="-1"
          />
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
            developer and team player. We spent time on javascript, Java,
            Python. as well as React Node and Spring Boot.
          </Text>
        </VStack>
      </VStack>
    </animated.div>
    // </animated.div>
  );
};

export default HomeScreen;
