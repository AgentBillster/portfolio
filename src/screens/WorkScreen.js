import React, { useState, useContext } from "react";
import { animated, useSpring } from "@react-spring/web";
import {
  Text,
  VStack,
  HStack,
  Heading,
  Select,
  CheckIcon,
  Button,
  Pressable,
  PresenceTransition,
} from "native-base";
import { useDrag } from "@use-gesture/react";
import { NavContext } from "./../providers/NavigationProvider";
import Pomodoro from "../Projects/Pomodoro/src/Pomodoro";

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
                children: [{ name: "component1" }, { name: "component2" }],
              },
              {
                name: "screens",
                children: [{ name: "screen1" }, { name: "screen2" }],
              },
              { name: "Pomodoro" },
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

  const bind = useDrag(
    ({ event, distance, offset: [, y] }) => {
      api.start({ y: y });
    },
    {
      rubberband: 0.9,
    }
  );

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
      {...bind()}
      style={{
        ...style,
        paddingBlock: "3%",
        paddingInline: "5%",
        width: "100%",
        transform: y.to((y) => `translate3d(0,${y}px,0)`),
      }}
    >
      <HStack mx="8" mt="10">
        <Heading
          _dark={{
            color: "white",
          }}
          letterSpacing="-2"
          color="gray"
          fontSize="50px"
        >
          PROJECTS
          <Text ml={"6px"} color="muted.500" fontSize="30px">
            {filteredData.length}
          </Text>
        </Heading>
        <HStack space={"4"} alignItems="center" ml={"auto"}>
          <Select
            colorScheme={"info"}
            p="12px"
            selectedValue={selectedTag}
            borderColor="rgba(80,80,80, 0.5)"
            borderWidth={1.5}
            placeholder="All"
            _selectedItem={{
              bg: "muted.600",
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(itemValue) => setSelectedTag(itemValue)}
          >
            <Select.Item label="react native" value="react native" />
          </Select>
          <Button
            onPress={() => setShowDemoProjects(!showDemoProjects)}
            colorScheme="warning"
          >
            HasDemo
          </Button>
        </HStack>
      </HStack>

      <VStack borderTopWidth="1" borderColor="rgba(80,80,80, 0.8)">
        {filteredData.map((item, i) => (
          <HStack key={item.id} mt={i === 0 ? "30px" : ""} ml="auto" space="4">
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
                  <Text fontSize={15} _hover={{ color: "blue.500" }}>
                    {item.tags.map(
                      (tag, index) =>
                        `${tag} ${index < item.tags.length - 1 ? " / " : ""}`
                    )}
                  </Text>

                  <Text
                    borderColor="muted.300"
                    fontSize="65px"
                    fontFamily="thin"
                  >
                    {item.title}
                  </Text>
                </HStack>
              </PresenceTransition>
            </Pressable>
          </HStack>
        ))}
      </VStack>
    </animated.div>
  );
};

export default WorkScreen;
