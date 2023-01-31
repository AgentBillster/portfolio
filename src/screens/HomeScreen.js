import React from "react";
import {
  Box,
  Center,
  Container,
  Divider,
  Text,
  VStack,
  ScrollView,
  useColorMode,
} from "native-base";
import { Dimensions } from "react-native";
import FadeMask from "../components/FadeMask";
import { useSpring, animated, useSpringValue } from "@react-spring/web";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const itemHeight = height / 5;

const HomeScreen = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorvalue = useSpringValue();

  const bg = useSpring({
    background: colorMode === "light" ? "white" : "#202023",
  });

  const handleToggle = () => {
    toggleColorMode();
    // colorMode === "light" ? colorvalue.start(1) : colorvalue.start(0);
  };

  return (
    <animated.div
      style={{
        ...bg,
        alignSelf: "center",
      }}
    >
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <VStack w="600">
          {[...Array(15).keys()].map((item, index) => (
            <Box height={itemHeight}>
              <Text color={"black"}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Box>
          ))}
        </VStack>
      </ScrollView>
      <FadeMask />
    </animated.div>
  );
};

export default HomeScreen;
