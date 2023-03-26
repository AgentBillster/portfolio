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
      <VStack flex={0.75}>
        {Object.keys(pages).map((page, i) =>
          page === "demo" ? null : (
            <Pressable
              key={i}
              flex="1"
              justifyContent={"center"}
              alignItems="center"
              onPress={() => {
                navigate(page);
              }}
            >
              <Text
                fontFamily="Light"
                textAlign="center"
                borderBottomWidth={page === currentPage ? 2 : 0}
                borderColor="rgba(80,80,80, 0.9)"
                fontSize="20px"
                style={{ transform: [{ rotate: "-90deg" }] }}
              >
                {page}
              </Text>
            </Pressable>
          )
        )}
      </VStack>
      <ColorModeSwitch />
    </Box>
  );
};

export default AnimatedNavPanel;
