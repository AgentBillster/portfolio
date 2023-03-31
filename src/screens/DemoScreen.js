import React, { useState } from "react";
import { animated } from "@react-spring/web";
import { Box, Center } from "native-base";
import { TreeNav } from "../navigators/TreeNav";
import { CodeViewer } from "../components/CodeViewer";

const DemoScreen = ({ style, data }) => {
  const [activeFile, setActiveFile] = useState("Readme.md");

  return (
    <animated.div
      style={{
        ...style,
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <Box bg={"#2d2d30"} flex={0.25}>
        <TreeNav
          data={data.fileData}
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
