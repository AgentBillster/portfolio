import React, { useEffect, useState } from "react";
import { Center, HStack } from "native-base";

import { useTransition } from "@react-spring/web";
import HomeScreen from "./screens/HomeScreen";
import WorkScreen from "./screens/WorkScreen";
import ContactScreen from "./screens/ContactScreen";
import AnimatedNavPanel from "./navigators/AnimatedNavPanel";
import AnimatedCursor from "react-animated-cursor";
import { Dimensions } from "react-native";

const pages = {
  home: ({ style }) => <HomeScreen style={style} />,
  work: ({ style }) => <WorkScreen style={style} />,
  contact: ({ style }) => <ContactScreen style={style} />,
};

const App = () => {
  const [page, setPage] = useState("home");
  const onPress = (page) => {
    setPage(page);
  };

  const transitions = useTransition(page, {
    keys: page,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: {
      display: "none",
    },
    reset: page !== "home",
  });

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
    <Center
      w={width}
      h={height}
      style={{
        background: "rgb(226,225,230)",
        background:
          "linear-gradient(0deg, rgba(226,225,230,1) 0%, rgba(206,205,209,1) 93%)",
      }}
    >
      <AnimatedCursor />
      <HStack
        margin={"auto"}
        w={width * 0.9}
        h={height * 0.9}
        borderWidth="2"
        borderColor="rgba(80,80,80, 0.4)"
        borderRadius={15}
        overflowY={"hidden"}
      >
        <AnimatedNavPanel pages={Object.keys(pages)} onPress={onPress} />
        {transitions((style, item, i) => {
          const Page = pages[item];
          return <Page style={style} />;
        })}
      </HStack>
    </Center>
  );
};

export default App;
