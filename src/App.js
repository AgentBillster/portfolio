import React, { useEffect, useContext, useState } from "react";
import { Center, HStack } from "native-base";
import AnimatedNavPanel from "./navigators/AnimatedNavPanel";
import AnimatedCursor from "react-animated-cursor";
import { Dimensions } from "react-native";
import { NavContext } from "./providers/NavigationProvider";
import AnimatedBackground from "./components/AnimatedBackground";

const App = () => {
  const { transitions, getPage } = useContext(NavContext);

  const [width, setWidth] = useState(Dimensions.get("window").width);
  const [height, setHeight] = useState(Dimensions.get("window").height);

  useEffect(() => {
    function handleResize() {
      setWidth(Dimensions.get("window").width);
      setHeight(Dimensions.get("window").height);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AnimatedBackground>
      <AnimatedCursor />
      <HStack
        w={width * 0.9}
        h={height * 0.8}
        borderWidth="1"
        borderColor="rgba(80,80,80, 0.7)"
        borderRadius={5}
        overflow={"hidden"}
      >
        <AnimatedNavPanel />
        {transitions((style, item) => getPage(item, style))}
      </HStack>
    </AnimatedBackground>
  );
};

export default App;
