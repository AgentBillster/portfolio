import React, { useState, useContext } from "react";
import { animated, useSpring } from "@react-spring/web";
import {
  Text,
  VStack,
  HStack,
  Pressable,
  PresenceTransition,
  ScrollView,
} from "native-base";
import { useWheel } from "@use-gesture/react";
import Pomodoro from "../Projects/Pomodoro/src/Pomodoro";

// on app load write py scan filestree =>  node
const data = [
  {
    id: 1,
    image: "https://picsum.photos/id/1/200/200",
    title: "Pomodoro",
    description: "a much needed app for personal use that keeps me focused!",
    tags: ["react native", "native base"],
    app: <Pomodoro />,
    fileData: [
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
                  { name: "NBaseForm.js" },
                  { name: "NBaseHeader.js" },
                  { name: "NBaseList.js" },
                  { name: "NBaseTabs.js" },
                ],
              },
              {
                name: "hooks",
                children: [
                  { name: "useNavigation.js" },
                  { name: "useToggle.js" },
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

  {
    id: 2,
    image: "https://picsum.photos/id/1/200/200",
    title: "CellularAutomata",
    description: "Cellular automata thingy",
    tags: ["react", "css"],
    link: "https://master--spiffy-sundae-845e4f.netlify.app/",
  },
  {
    id: 5,
    image: "https://picsum.photos/id/1/200/200",
    title: "PreemFLP",
    description: "wow thats bad lol",
    link: "https://github.com/PreemFreelancePlatform",
    tags: ["spring boot", "react"],
  },
  {
    id: 3,
    image: "https://picsum.photos/id/1/200/200",
    title: "GHubFE",
    description: "App that connects gamers together",
    link: "https://github.com/AgentBillster/gameThing",
    tags: ["geoloc", "socialOauth2", "imageAPI", "asyncStorage"],
  },
  {
    id: 4,
    image: "https://picsum.photos/id/1/200/200",
    title: "BE4Ghub",
    description: "backend for ghub",
    link: "https://github.com/AgentBillster/GHubApp",
    tags: ["express", "oauth2", "mongoose", "geolib"],
  },
  {
    id: 6,
    image: "https://picsum.photos/id/1/200/200",
    title: "FirstWebsite.ever",
    description: "backend for some shit code on github",
    link: "https://5e17c55e7d016d0188b94241--fishfriends1.netlify.app/index.html",
    tags: ["html", "css"],
  },
];

const WorkScreen = ({ navigate }) => {
  const [hoveredIndex, setHoveredIndex] = useState("");

  const handlePress = (item) => {
    return item.app ? navigate("demo", item) : window.open(item.link, "_blank");
  };

  return (
    <ScrollView w="full" p="7%" showsVerticalScrollIndicator={false}>
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
            {data.length}
          </Text>
        </Text>
      </HStack>

      <VStack mt="10" borderColor="rgba(80,80,80, 0.8)">
        {data.map((item, i) => (
          <HStack key={item.id} mt={i === 0 ? "30px" : ""} ml="auto" space="4">
            <Pressable
              onHoverIn={() => setHoveredIndex(i)}
              onHoverOut={() => setHoveredIndex("")}
              onPress={() => handlePress(item)}
            >
              <PresenceTransition
                visible={hoveredIndex === i} // trigger animation when we hover over index
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
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
                <Text variant="tagtext" color={"muted.500"}>
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
              </PresenceTransition>
            </Pressable>
          </HStack>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default WorkScreen;
