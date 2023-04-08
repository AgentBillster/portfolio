import React, { useContext, useState } from "react";
import {
  Pressable,
  VStack,
  Text,
  Box,
  Center,
  Divider,
  PresenceTransition,
  useBreakpointValue,
  Stack,
  Hidden,
  useMediaQuery,
} from "native-base";
import ColorModeSwitch from "./../components/ColorModeSwitch";

export const NavBar = ({ pages, navigate, currentPage }) => {
  const [isLargerThan980] = useMediaQuery({ minWidth: 980 });
  const [hoveredIndex, setHoveredIndex] = useState("");

  const deg = useBreakpointValue(["0deg", "-90deg", "-90deg", "-90deg"]);

  return (
    <Box
      zIndex={10}
      w={isLargerThan980 ? "8%" : "75%"}
      bg={isLargerThan980 ? "" : "white"}
      borderRightWidth={isLargerThan980 ? 1 : 0}
      borderColor={isLargerThan980 ? "muted.500" : ""}
      m={isLargerThan980 ? 0 : "auto"}
      mb={isLargerThan980 ? 0 : 4}
      p={isLargerThan980 ? 0 : 1}
      justifyContent={isLargerThan980 ? "" : "center"}
      borderRadius={isLargerThan980 ? 0 : 4}
    >
      {isLargerThan980 && (
        <>
          <Center flex={0.1}>
            <Text variant="topnavtext">W.</Text>
          </Center>
          <Divider bg={"muted.500"} />
        </>
      )}

      <Stack direction={["row", "column", "column", "column"]} flex={0.75}>
        {Object.keys(pages).map((page, i) =>
          page === "demo" ? null : (
            <Pressable
              key={i}
              flex="1"
              justifyContent={"center"}
              alignItems="center"
              onHoverIn={() => setHoveredIndex(i)}
              onHoverOut={() => setHoveredIndex("")}
              onPress={() => {
                navigate(page);
              }}
            >
              <PresenceTransition
                visible={hoveredIndex === i} // trigger animation when we hover over index
                initial={{
                  opacity: 1,
                }}
                animate={{
                  opacity: 0.4,
                  transition: {
                    duration: 400,
                  },
                }}
              >
                <Text
                  style={{ transform: `rotate(${deg})` }}
                  variant={"navitemtext"}
                  _dark={{
                    color: "white",
                  }}
                  color={page === currentPage ? "muted.400" : 0}
                >
                  {page}
                </Text>
              </PresenceTransition>
            </Pressable>
          )
        )}
      </Stack>
      {isLargerThan980 && (
        <>
          <Divider bg={"muted.500"} />
          <ColorModeSwitch />
        </>
      )}
    </Box>
  );
};
