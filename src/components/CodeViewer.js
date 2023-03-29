import { useColorMode } from "native-base";
import React from "react";
import { CodeBlock, a11yLight, github } from "react-code-blocks";

const codeBlocks = {
  component1: "function Component1",
  component2: "function Component2}",
  screen1: "function Screen1",
  screen2: "function Screen2",
  Pomodoro: "function Pomodoro",
  readme: "function readme",
};

export const CodeViewer = ({ activeFile = "readme" }) => {
  const code = codeBlocks[activeFile];
  const { colorMode } = useColorMode();

  return (
    <CodeBlock
      theme={github}
      customStyle={{
        height: "100%",
        fontSize: "16px",
      }}
      text={code || "No code to display yet."}
      language="jsx"
    />
  );
};
