import React, { useState } from "react";

import {
  Text,
  HStack,
  Pressable,
  PresenceTransition,
  ScrollView,
  Box,
  Center,
  View,
  Stagger,
  useColorMode,
  useMediaQuery,
  useBreakpointValue,
} from "native-base";
import Pomodoro from "../Projects/Pomodoro/src/Pomodoro";
import { Conways } from "../Projects/Conways/src/Conways";
import pomo from "../assets/lottie/pomo.json";
import { SlideAnimation } from "../components/SlideAnimation";
import { Wheel } from "../components/Wheel";
import { breakpoints } from "../theme";

const data = [
  {
    id: 1,
    title: "Pomodoro",
    description: "A productivity app that helps you stay focused (App store version is way better)",
    year: 2023,
    demoData: {
      app: (closeApp, viewCode) => (
        <Pomodoro closeApp={closeApp} viewCode={viewCode} />
      ),
      splashAnim: pomo,
      fileTree: [
        {
          name: "Pomodoro",
          defaultOpen: true,
          children: [
            {
              name: "src",
              defaultOpen: true,
              children: [
                {
                  name: "components",
                  children: [
                    { name: "HeaderBar.js" },
                    { name: "TaskList.js" },
                    { name: "TaskCard.js" },
                    { name: "AlertOverlay.js" },
                    { name: "ChoiceModal.js" },
                    { name: "NavWidget.js" },
                    { name: "NewTask.js" },
                    { name: "OnBoarding.js" },
                  ],
                },
                {
                  name: "screens",
                  children: [
                    { name: "TaskScreen.js" },
                    { name: "TimerScreen.js" },
                  ],
                },
                { name: "Pomodoro.js" },
                { name: "Readme.md" },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: 2,
    title: "Conways",
    description: "A simple algorithm for cellular automata",
    year: 2023,
    demoData: {
      app: (closeApp, viewCode) => (
        <Conways closeApp={closeApp} viewCode={viewCode} />
      ),
      splashAnim: pomo,
      fileTree: [
        {
          name: "Conways",
          defaultOpen: true,
          children: [
            {
              name: "src",
              defaultOpen: true,
              children: [
                { name: "Conways.js" },
                { name: "GridOld.js" },
                { name: "GridRevised.js" },
                { name: "Readme.md" },
              ],
            },
          ],
        },
      ],
    },
  },


  {
    id: 3,
    title: "Nexus",
    description: "A platform for esports tournaments",
    link: "https://github.com/NexusEsportsPlatform/Nexus-FE",
    year: 2019,
  },

  {
    id: 4,
    title: "FishFriends",
    description: "A website to show you where all the best fishing spots are",
    link: "https://5e17c55e7d016d0188b94241--fishfriends1.netlify.app/index.html",
    year: 2019,
  },
];

const WorkScreen = ({ navigate }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [hoveredIndex, setHoveredIndex] = useState("");

  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });
  const [isPhone] = useMediaQuery({ maxWidth: breakpoints.md });
  const wheelSize = useBreakpointValue({
    base: "100",
    sm: "140",
    md: "225",
    lg: "250",
    xl: "275",
    xxl: "325",
  });

  const font = useBreakpointValue({
    base: "2.5em",
    sm: "2.7em",
    md: "3em",
    lg: "3em",
    xl: "2.3em",
    xxl: "2.3em",
  });

  const spacing = useBreakpointValue({
    base: "10%",
    sm: "10%",
    md: "10%",
    lg: "10%",
    xl: "10%",
    xxl: "10%",
  });

  const handlePress = (item) => {
    if (item.demoData) {
      navigate("demo", item.demoData);
      colorMode === "light" && toggleColorMode();
    } else {
      window.open(item.link, "_blank");
    }
  };

  if (isPhone) {
    return (
      <ScrollView showsVerticalScrollIndicator={false} zIndex={-1} p="6%">
        <View py="4%" mt="6%" alignItems={"end"}>
          <Wheel size={wheelSize} fontSize={font} text={"Projects "} />
        </View>
        <Text
          alignSelf={"end"}
          opacity={0.6}
          fontSize={"1.5em"}
          fontFamily={"Light"}
        >
          {"[Stuff]"}
        </Text>
        <Stagger
          style={{
            alignItems: "end",
            height: "9%",
          }}
          visible={true}
          initial={{
            opacity: 0,
            translateY: 100,
          }}
          animate={{
            translateY: 0,
            opacity: 1,

            transition: {
              type: "spring",
              damping: 100,
              stagger: {
                offset: 50,
              },
            },
          }}
        >
          {data.map((item, i) => (
            <Pressable onPress={() => handlePress(item, i)} key={item.id}>
              <ProjectCard item={item} i={i} hoveredIndex={hoveredIndex} />
            </Pressable>
          ))}
        </Stagger>
        <View h={"20%"} />
      </ScrollView>
    );
  }

  return (
    <HStack
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Center flex={0.5} mt="23%">
        {/* <Box position={"absolute"}>
          {hoverData && !isMobile && <ProjectInfo hoverData={hoverData} />}
        </Box> */}

        <SlideAnimation
          visible={!isMobile}
          axis="y"
          from={40}
          to={0}
          speed={30}
        >
          <Wheel size={wheelSize} fontSize={font} text={"Projects "} />
        </SlideAnimation>
      </Center>
      <ScrollView
        position={"fixed"}
        right={isMobile ? "0" : "6%"}
        showsVerticalScrollIndicator={false}
        h={"100vh"}
        w="80%"
        p="4%"
      >
        {isMobile && (
          <View pt="25%" pb="3%" alignItems="end">
            <Wheel size={150} fontSize={font} text={"Projects "} />
          </View>
        )}
        <Text
          mt={!isMobile && spacing}
          alignSelf={"end"}
          opacity={0.6}
          fontSize={"1.5em"}
          fontFamily={"Light"}
        >
          {"[Stuff I've Made]"}
        </Text>
        <Stagger
          style={{
            alignItems: "end",
            height: isMobile ? "" : "",
          }}
          visible={true}
          initial={{
            opacity: 0,
            translateY: 100,
          }}
          animate={{
            translateY: 0,
            opacity: 1,
            transition: {
              type: "spring",
              damping: 100,
              stagger: {
                offset: 50,
              },
            },
          }}
        >
          {data.map((item, i) => (
            <Pressable
              onHoverIn={() => {
                setHoveredIndex(i);
              }}
              onHoverOut={() => {
                setHoveredIndex("");
              }}
              onPress={() => handlePress(item, i)}
              key={item.id}
            >
              <ProjectCard item={item} i={i} hoveredIndex={hoveredIndex} />
            </Pressable>
          ))}
        </Stagger>
      </ScrollView>
    </HStack >
  );
};

export default WorkScreen;

const ProjectCard = React.memo(({ item, i, hoveredIndex }) => {
  return (
    <PresenceTransition
      visible={true}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        marginBottom: hoveredIndex === i ? "2em" : "0.5em",
        opacity: hoveredIndex === "" || hoveredIndex === i ? 1 : 0.3,
        transition: "margin-bottom 0.3s ease-in-out",
      }}
      initial={{
        opacity: 1,
      }}
      animate={{
        transition: {
          type: "timing",
          duration: 600,
        },
      }}
    >
      <HStack alignItems="baseline">
        {!item.link && (
          <Text
            fontSize="sm"
            opacity={0.6}
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
          >
            App Demo
          </Text>
        )}
        {item.link && (
          <Text
            top={2}
            fontSize="sm"
            opacity={0.6}
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
          >
            External ↗
          </Text>
        )}
        <Text variant={"projtext"} color={hoveredIndex === i && "muted.400"}>
          {item.title}
        </Text>
      </HStack>

      {hoveredIndex === i && (
        <PresenceTransition
          visible={true}
          initial={{
            opacity: 0,

          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 500,
            },
          }}
        >
          <Box
            alignSelf="flex-end"
            maxWidth="70%"
            mt={2}
          >
            <Text
              fontSize="sm"
              textAlign="right"
              opacity={0.8}
            >
              {item.description}
            </Text>
          </Box>
        </PresenceTransition>
      )}
    </PresenceTransition>
  );
});
