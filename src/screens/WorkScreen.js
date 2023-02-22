import React, { useState, useContext } from "react";
import { animated, useSpring } from "@react-spring/web";
import ProjectCard from "../components/ProjectCard";

import { Dimensions } from "react-native";
import { Center, Text, VStack, Box, Button } from "native-base";
import { useDrag } from "@use-gesture/react";
import useMeasure from "react-use-measure";
import { usePageNavigation } from "./../hooks/usePageNavigation";
import { NavContext } from "./../providers/NavigationProvider";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const data = [
  {
    id: 1,
    title: "GameHub",
    description: "this is my own creation uses blah blah features blah blah",
    hasDemo: true,
  },
  {
    id: 2,
    title: "Todo",
    description: "A todo app where i learned the basics of gesture animations",
    hasDemo: true,
  },
  {
    id: 3,
    title: "Pomodoro",
    description: "a much needed app for personal use that keeps me focused!",
    hasDemo: true,
  },
  {
    id: 4,
    title: "Backend 1",
    description: "backend for some shit code on github",
    hasDemo: false,
  },
  {
    id: 5,
    title: "Backend 2",
    description: "backend for some shit code on github",
    hasDemo: false,
  },
];

const WorkScreen = ({ style, pages }) => {
  const { navigate } = useContext(NavContext);
  const [ref, { height }] = useMeasure();
  const [filterDemo, setFilterDemo] = useState(false);
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      (!filterDemo || item.hasDemo) &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: { tension: 300, friction: 30 },
  }));

  const bind = useDrag(
    ({ event, distance, offset: [, y] }) => {
      api.start({ y: y });
    },
    {
      bounds: {
        bottom: 0,
        top: -height + 600,
      },

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
      <Center ref={ref} w={"100%"} bg="lightgreen">
        <VStack
          flex="1"
          flexDirection={"row"}
          flexWrap="wrap"
          justifyContent="center"
          alignItems={"center"}
          width="60%"
        >
          {filteredData.map((item, i) => (
            <Box bg="white" w={400} h={500}>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Button
                onPress={() => {
                  navigate("demo");
                }}
                w={40}
                m="auto"
              >
                go
              </Button>
            </Box>
          ))}
        </VStack>
      </Center>
    </animated.div>
  );
};

export default WorkScreen;

{
  /* <Stagger
  visible={true}
  initial={{
    opacity: 0,
    translateY: 500,
  }}
  animate={{
    translateY: 0,
    opacity: 1,
    transition: {
      delay: 100,
      type: "spring",
      easing: 20,
      stagger: {
        offset: 50,
      },
    },
  }}
></Stagger>; */
}
