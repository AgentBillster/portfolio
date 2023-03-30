import React, { useState, useContext } from "react";
import { animated, useSpring } from "@react-spring/web";
import {
  Text,
  VStack,
  HStack,
  Pressable,
  PresenceTransition,
  Divider,
  Center,
  Stagger,
  Box,
} from "native-base";
import { useWheel } from "@use-gesture/react";
import { NavContext } from "./../providers/NavigationProvider";
import Pomodoro from "../Projects/Pomodoro/src/Pomodoro";

// on app load write py scan filestree =>  node
const data = [
  {
    id: 1,
    image: "https://picsum.photos/id/1/200/200",
    title: "Pomodoro",
    description: "a much needed app for personal use that keeps me focused!",
    tags: ["react native", "native base"],
    hasDemo: true,
    app: <Pomodoro />,
    fileData: [
      {
        name: "Pomodoro",
        defaultOpen: true,
        children: [
          {
            name: "src",
            children: [
              {
                name: "components",
                children: [
                  { name: "component1.js" },
                  { name: "component2.js" },
                ],
              },
              {
                name: "screens",
                children: [{ name: "screen1.js" }, { name: "screen2.js" }],
              },
              { name: "Pomodoro.js" },
              { name: "Readme.md" },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 2,
    image: "https://picsum.photos/id/1/200/200",
    title: "STEAMRANK",
    description: "backend for some shit code on  github",
    tags: ["react native", "native base"],
    hasDemo: false,
  },
  {
    id: 3,
    image: "https://picsum.photos/id/1/200/200",
    title: "backendjv",
    description: "backend for some shit code on github",
    tags: ["react native", "native base"],
    hasDemo: false,
  },
  {
    id: 4,
    image: "https://picsum.photos/id/1/200/200",
    title: "JAVATHING .tm",
    description: "backend for some shit code on github",
    tags: ["react native", "native base"],
    hasDemo: false,
  },
  {
    id: 5,
    image: "https://picsum.photos/id/1/200/200",
    title: "SOMEOther shit",
    description: "backend for some shit code on  github",
    tags: ["react native", "native base"],
    hasDemo: false,
  },
  {
    id: 6,
    image: "https://picsum.photos/id/1/200/200",
    title: "IDKasos",
    description: "backend for some shit code on github",
    tags: ["react native", "native base"],
    hasDemo: false,
  },
  {
    id: 7,
    image: "https://picsum.photos/id/1/200/200",
    title: "haha nice",
    description: "backend for some shit code on github",
    tags: ["react native", "native base"],
    hasDemo: false,
  },
];

const WorkScreen = ({ style }) => {
  const { navigate } = useContext(NavContext);
  const [showDemoProjects, setShowDemoProjects] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState("");

  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: { tension: 300, friction: 30 },
  }));

  const wheel = useWheel(({ offset: [, y] }) => {
    api.start({ y: -y });
  });

  const filteredData = data.filter((item) => {
    // Filter by hasDemo
    if (showDemoProjects && !item.hasDemo) {
      return false;
    }

    // Filter by selectedTag
    if (selectedTag !== "" && !item.tags.includes(selectedTag)) {
      return false;
    }

    return true;
  });

  return (
    <animated.div
      style={{
        width: "100%",
        height: "2300px",
        paddingBlock: "4%",
        paddingInline: "5%",
        transform: y.to((y) => `translate3d(0,${y}px,0)`),
      }}
      {...wheel()}
    >
      <HStack borderBottomWidth={1}>
        <Text
          _dark={{
            color: "white",
          }}
          letterSpacing="-2"
          color="gray"
          variant="workheader"
        >
          PROJECTS
          <Text
            ml={"6px"}
            color="muted.500"
            fontSize={["30px", "30px", "40px", "50px"]}
          >
            {filteredData.length}
          </Text>
        </Text>
      </HStack>

      <VStack mt="20" borderColor="rgba(80,80,80, 0.8)">
        <Stagger
          visible={true}
          initial={{
            opacity: 0,
            translateY: 100,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
            transition: {
              type: "spring",
              stagger: {
                offset: 34,
              },
            },
          }}
        >
          {filteredData.map((item, i) => (
            <HStack
              key={item.id}
              mt={i === 0 ? "30px" : ""}
              ml="auto"
              space="4"
            >
              <Pressable
                onHoverIn={() => setHoveredIndex(i)}
                onHoverOut={() => setHoveredIndex("")}
                onPress={() => {
                  navigate("demo", item);
                }}
                flex={1}
                flexDir="row"
                alignItems={"flex-end"}
              >
                <PresenceTransition
                  visible={hoveredIndex === i} // trigger animation when we hover over index
                  initial={{
                    opacity: 0.8,
                  }}
                  animate={{
                    opacity: 0.2,
                    transition: {
                      duration: 400,
                    },
                  }}
                >
                  <HStack>
                    <Text variant="tagtext" _hover={{ color: "blue.500" }}>
                      {item.tags.map(
                        (tag, index) =>
                          `${tag} ${index < item.tags.length - 1 ? " / " : ""}`
                      )}
                    </Text>

                    <Text
                      variant={"projtext"}
                      borderColor="muted.300"
                      fontFamily="thin"
                    >
                      {item.title}
                    </Text>
                  </HStack>
                </PresenceTransition>
              </Pressable>
            </HStack>
          ))}
        </Stagger>
      </VStack>
    </animated.div>
  );
};

export default WorkScreen;
