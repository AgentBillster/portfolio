import React, { useState } from "react";
import { useColorMode } from "native-base";
import AnimatedCursor from "react-animated-cursor";
import AnimatedBackground from "./components/AnimatedBackground";
import { NavBar } from "./navigators/NavBar";
import { animated, useTransition } from "@react-spring/web";
import HomeScreen from "./screens/HomeScreen";
import { View } from "react-native";
import WorkScreen from "./screens/WorkScreen";
import ContactScreen from "./screens/ContactScreen";

const App = () => {
  const { colorMode } = useColorMode();

  const pages = {
    home: ({ style }) => (
      <animated.div style={{ ...style, flex: 1 }}>
        <HomeScreen />
      </animated.div>
    ),
    work: ({ style }) => (
      <animated.div style={{ ...style, flex: 1 }}>
        <WorkScreen />
      </animated.div>
    ),
    contact: ({ style }) => (
      <animated.div style={{ ...style, flex: 1 }}>
        <ContactScreen />
      </animated.div>
    ),
  };

  const [currentPage, setCurrentPage] = useState("home");

  const transitions = useTransition(currentPage, {
    from: {
      scale: 1,
      opacity: 0,
      transform: "translate3d(100%,0,0)",
      config: {
        type: "spring",
        duration: 200,
      },
    },
    enter: {
      opacity: 1,
      scale: 1,
      opacity: 1,
      transform: "translate3d(0%,0,0)",
    },
    leave: {
      scale: 1,
      opacity: 0,
      transform: "translate3d(20%,0,0)",
      config: {
        type: "spring",
        duration: 400,
      },
    },
    exitBeforeEnter: true,
  });

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const color = colorMode === "light" ? "150, 150, 150" : "255, 255, 255";
  return (
    <AnimatedBackground>
      <AnimatedCursor
        color={color}
        innerSize={3}
        outerSize={18}
        trailingSpeed={8}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        outerStyle={{
          border: `1px solid rgb(${color})`,
        }}
      />
      <View
        style={{
          width: "90vw",
          height: "90vh",
          border: "1px solid rgba(80,80,80, 0.9)",
          display: "flex",
          flexDirection: "row",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <NavBar pages={pages} navigate={navigate} currentPage={currentPage} />
        {transitions((style, i) => {
          const Page = pages[i];
          return <Page style={style} />;
        })}
      </View>
    </AnimatedBackground>
  );
};

export default App;
