import React, { useContext } from "react";
import {
  HStack,
  Pressable,
  VStack,
  Text,
  Heading,
  Box,
  Center,
  Switch,
  Divider,
} from "native-base";
import { Dimensions } from "react-native";
import { useTransition } from "@react-spring/web";
import TreeNav from "./TreeNav";
import { usePageNavigation } from "./../hooks/usePageNavigation";
import { NavContext } from "./../providers/NavigationProvider";
import ColorModeSwitch from "./../components/ColorModeSwitch";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AnimatedNavPanel = () => {
  const { pages, navigate, currentPage } = useContext(NavContext);
  return (
    <Box borderRightWidth="1" borderColor={"muted.500"}>
      <Center flex={0.1}>
        <Text fontFamily={"Medium"} fontSize="20px">
          W.
        </Text>
      </Center>
      <Divider bg={"muted.500"} />
      <VStack flex={0.7} justifyContent="center">
        {Object.keys(pages).map((page, i) =>
          page === "demo" ? null : (
            <Pressable
              style={{ transform: [{ rotate: "-90deg" }] }}
              my={"100%"}
              key={page}
              borderBottomWidth={page === currentPage ? 2 : 0}
              py={4}
              textAlign={"center"}
              onPress={() => {
                navigate(page);
              }}
            >
              <Text fontFamily={"Book"} fontSize="20px">
                {page}
              </Text>
            </Pressable>
          )
        )}
      </VStack>
      <Divider bg={"muted.500"} />
      <ColorModeSwitch />
      <Divider bg={"muted.500"} />
      <ColorModeSwitch />
    </Box>
  );
};

export default AnimatedNavPanel;
