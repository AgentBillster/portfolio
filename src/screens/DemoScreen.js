import React from "react";
import { animated } from "@react-spring/web";
import { HStack, Box, Center, Text, Heading } from "native-base";
import TradeApp from "./../Projects/TradeApp/src/TradeApp";
import { TreeNav } from "../navigators/TreeNav";
import {
  a11yDark,
  a11yLight,
  atomOneDark,
  CodeBlock,
  dracula,
  nord,
} from "react-code-blocks";
// no mobile 500
const DemoScreen = ({ style, data }) => {
  data && console.log(data);
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
        <TreeNav />
      </Box>

      <Box bg={"#2d2d30"} flex={0.45}>
        <CodeBlock
          text={"cddaosd asdo asd oasd oasod "}
          theme={a11yLight}
          customStyle={{
            height: "100%",
            fontSize: "16px",
          }}
        />
      </Box>

      <Center flex={0.35}>
        <div className="iphone-x">
          <i></i>
          <TradeApp />
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
