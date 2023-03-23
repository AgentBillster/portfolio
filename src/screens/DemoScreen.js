import React, { useState } from "react";
import { animated } from "@react-spring/web";
import { HStack, Box, Center, Text, Heading } from "native-base";
import { TreeNav } from "../navigators/TreeNav";
import {
  a11yDark,
  a11yLight,
  atomOneDark,
  CodeBlock,
  dracula,
  nord,
} from "react-code-blocks";

const DemoScreen = ({ style, data }) => {
  const [activeFile, setActiveFile] = useState(data.title); // all projects main file is named after themselves.
  // import data
  console.log(activeFile);
  return (
    <animated.div
      style={{
        ...style,
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <Box bg={"#2d2d30"} flex={0.2}>
        <TreeNav data={data.fileData} setActiveFile={setActiveFile} />
      </Box>

      {/* 
      <Box bg={"#2d2d30"} flex={0.45}>
        <CodeBlock
          theme={a11yLight}
          customStyle={{
            height: "100%",
            fontSize: "16px",
          }}
          text={activeFile ? activeFile : "null"}
          language="jsx"
        />
      </Box> */}

      <Center flex={0.35}>
        <div className="iphone-x">
          <i></i>
          {data.app}
        </div>
      </Center>
    </animated.div>
  );
};

export default DemoScreen;
{
  /* <Box w={'375'} h='812'>
      </Box> */
}
