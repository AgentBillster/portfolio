import React, { useContext } from "react";
import { HStack, useColorMode } from "native-base";
import AnimatedNavPanel from "./navigators/AnimatedNavPanel";
import AnimatedCursor from "react-animated-cursor";
import { NavContext } from "./providers/NavigationProvider";
import { View } from "react-native-web";

import AnimatedBackground from "./components/AnimatedBackground";

const App = () => {
  const { transitions, getPage } = useContext(NavContext);
  const { colorMode } = useColorMode();
  const color = colorMode === "light" ? "150, 150, 150" : "255, 255, 255";
  return (
    <AnimatedBackground>
      {/* <AnimatedCursor
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
      /> */}
      <View
        style={{
          width: "90%",
          height: "90%",
          border: "1px solid rgba(80,80,80, 0.9)",
          borderRadius: "5",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <AnimatedNavPanel />
        {transitions((style, item) => getPage(item, style))}
      </View>
    </AnimatedBackground>
  );
};

export default App;
