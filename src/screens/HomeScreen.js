import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { useWheel } from "@use-gesture/react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Divider,
  Image,
  ScrollView,
} from "native-base";
import SocialLinks from "../components/SocialLink";

const HomeScreen = ({ style }) => {
  return (
    <animated.div style={{ ...style, flex: 1 }}>
      <ScrollView w="full" h="full" p="5%" showsVerticalScrollIndicator={false}>
        <VStack p="2" alignItems={"flex-start"}>
          <Text variant="bigtext">William Wilson</Text>
          <Text pl="4" variant="bigsubtext">
            Fullstack Web Developer
          </Text>
        </VStack>

        <HStack mt={"100"}>
          <SocialLinks />
          <Image
            position={"absolute"}
            right={["150", "40px", "60px", "20px"]}
            bottom={["50px", "-80px", "-80px", "-90px"]}
            w={["100px", "220px", "290px", "330px"]}
            h={["90px", "250px", "310px", "360px"]}
            borderWidth={1}
            borderColor="rgba(80,80,80, 0.7)"
            source={require("../assets/images/me.jpg")}
            alt="Alternate Text"
            borderRadius={"20"}
          />
        </HStack>

        <Divider bgColor="grey" zIndex="-1" />
        <VStack w={"70%"} mt={"40px"} alignItems={"baseline"} space="5">
          <Box>
            <Text variant={"sectionheader"}>Bio</Text>
            <Divider
              _dark={{
                bgColor: "white",
              }}
              zIndex="-1"
              borderWidth={1}
              borderRadius="60"
              borderColor="rgba(80,80,80, 0.9)"
            />
          </Box>
          <Text variant={"sectiontext"}>
            I've learned the ropes through hands-on experience and lots of
            self-teaching. I got my start with the Lambda program, but I've been
            building and tinkering ever since. I'm always looking for ways to
            push the boundaries with innovative solutions and fresh ideas. And
            with a easygoing demeanor and strong communication skills, I'm a
            great collaborator and teammate.
          </Text>
        </VStack>

        <VStack w={"70%"} mt={"40px"} alignItems={"baseline"} space="5">
          <Box>
            <Text variant={"sectionheader"}>Education</Text>
            <Divider
              _dark={{
                bgColor: "white",
              }}
              zIndex="-1"
              borderWidth={1}
              borderRadius="60"
              borderColor="rgba(80,80,80, 0.9)"
            />
          </Box>

          <VStack>
            <Text variant={"sectiontext"}>
              Bloom Institite Of technology
              <Text variant={"sectiontext"}>/ Las Vegas / 2018 - 2019 </Text>
            </Text>

            <Text variant={"sectiontext"} mt={"10px"}>
              A rigorous 9-month web development program that emphasized
              practical, hands-on learning to improve my skills as both a
              developer and team player. We spent time on javascript, Java,
              Python. as well as React Node and Spring Boot.
            </Text>
          </VStack>
        </VStack>
      </ScrollView>
    </animated.div>
  );
};

export default HomeScreen;
