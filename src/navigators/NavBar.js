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
    <Box borderRightWidth="1" borderColor={"muted.500"}>
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
                  borderBottomWidth={page === currentPage ? 1 : 0}
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
