import React, { useState } from "react";
import { useColorMode, HStack, Stack, Box } from "native-base";
import AnimatedCursor from "react-animated-cursor";
import AnimatedBackground from "./components/AnimatedBackground";
import { NavBar } from "./navigators/NavBar";
import { animated, useTransition } from "@react-spring/web";
import HomeScreen from "./screens/HomeScreen";
import WorkScreen from "./screens/WorkScreen";
import ContactScreen from "./screens/ContactScreen";

const App = () => {
  const pages = {
    home: ({ style }) => <HomeScreen style={style} />,
    work: ({ style }) => <WorkScreen style={style} />,
    contact: ({ style }) => <ContactScreen style={style} />,
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

  return (
    <Stack
      w={["100%", "90%", "90%", "90%"]}
      h={["100%", "90%", "90%", "90%"]}
      direction={["column-reverse", "row", "row", "row"]}
      borderRadius={5}
      style={{
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.4)",
      }}
    >
      <NavBar pages={pages} navigate={navigate} currentPage={currentPage} />
      {transitions((style, i) => {
        const Page = pages[i];
        return <Page style={style} />;
      })}
    </Stack>
  );
};

export default App;
