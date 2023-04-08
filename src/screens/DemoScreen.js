import React, { useState } from "react";
import { animated } from "@react-spring/web";
import { Box, Center, useMediaQuery } from "native-base";
import { TreeNav } from "../navigators/TreeNav";
import { CodeViewer } from "../components/CodeViewer";

const DemoScreen = ({ data }) => {
  const [activeFile, setActiveFile] = useState("Readme.md");
  const [isMobile] = useMediaQuery({ maxWidth: 980 });
  const [showCode, setShowCode] = useState(true);

  if (isMobile) {
    if (showCode) {
      return (
        <animated.div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 100,
            display: "flex",
          }}
        >
          <Box bg={"#2d2d30"} flex={0.4}>
            <TreeNav
              data={data.fileTree}
              setActiveFile={setActiveFile}
              activeFile={activeFile}
            />
          </Box>

          <Box bg={"#2d2d30"} flex={0.6}>
            <CodeViewer activeFile={activeFile} />
          </Box>
        </animated.div>
      );
    }

    return (
      <Center w="full" h="full">
        <div className="iphone-x">
          <i></i>
          {data.app}
        </div>
      </Center>
    );
  }

  return (
    <animated.div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <Box bg={"#2d2d30"} flex={0.25}>
        <TreeNav
          data={data.fileTree}
          setActiveFile={setActiveFile}
          activeFile={activeFile}
        />
      </Box>

      <Box bg={"#2d2d30"} flex={0.45}>
        <CodeViewer activeFile={activeFile} />
      </Box>

      <Center flex={0.3}>
        <div className="iphone-x">
          <i></i>
          {data.app}
        </div>
      </Center>
    </animated.div>
  );
};

export default DemoScreen;
