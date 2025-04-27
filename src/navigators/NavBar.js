import React, { useState } from "react";
import {
  Pressable,
  Text,
  Center,
  Divider,
  PresenceTransition,
  Stack,
  useMediaQuery,
  CircleIcon,
  useColorMode,
} from "native-base";
import ColorModeSwitch from "./../components/ColorModeSwitch";
import { ConditionalWrapper } from "../components/ConditionalWrapper";
import { breakpoints } from "../theme";
import { useSpring, animated } from "@react-spring/web";

export const NavBar = React.memo(({ pages, navigate, currentPage }) => {
  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });
  const [hoveredIndex, setHoveredIndex] = useState("");
  const { colorMode } = useColorMode();

  const bg = useSpring({
    background: colorMode === "light" ? "#F9F9F8" : "rgb(20, 20, 20)",
    delay: 20,
    config: {
      duration: 300,
    },
  });

  return (
    <ConditionalWrapper
      condition={isMobile}
      wrapper={(children) => (
        <Center
          zIndex={1}
          w={"100vw"}
          bg={colorMode === "light" ? "rgb(250, 250, 250)" : "rgb(26, 26, 26)"}
          position="absolute"
          bottom={0}
          h="8%"
          style={{
            boxShadow: "0px -2px 5px 0px #E9E9E9",
          }}
        >
          {children}
        </Center>
      )}
    >
      <animated.div
        style={{
          ...bg,
          display: "flex",
          flexDirection: "column",
          width: isMobile ? "65%" : "6%",
          borderLeftRadius: "25px",
          borderRight: !isMobile && "1px solid rgba(160,160,160,1)",
        }}
      >
        {!isMobile && (
          <>
            <Center flex={0.12}>
              <Text fontSize={"1.3em"}>W.</Text>
            </Center>
            <Divider bg="muted.400" />
          </>
        )}

        <Stack direction={isMobile && "row"} flex={0.75}>
          {Object.keys(pages).map((page, i) =>
            page === "demo" ? null : (
              <Pressable
                key={i}
                flex="1"
                flexDirection={isMobile ? "row-reverse" : "row"}
                justifyContent={"space-evenly"}
                alignItems="center"
                onHoverIn={() => setHoveredIndex(i)}
                onHoverOut={() => setHoveredIndex("")}
                onPress={() => {
                  navigate(page);
                }}
                style={{
                  transform: `rotate(${!isMobile && "-90deg"})`,
                }}
              >
                <PresenceTransition
                  visible={hoveredIndex === i} // trigger animation when we hover over index
                  initial={{
                    opacity: currentPage === page ? 1 : 0.5,
                  }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 200,
                    },
                  }}
                >
                  <Text variant={"titleTextHeader"} fontFamily={"Light"}>
                    <PresenceTransition
                      visible={currentPage === page}
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                        transition: {},
                      }}
                    >
                      <Text>
                        <CircleIcon size="8px" mr="5px" alignSelf="baseline" />
                      </Text>
                    </PresenceTransition>
                    {page}
                  </Text>
                </PresenceTransition>
              </Pressable>
            )
          )}
        </Stack>
        {!isMobile && (
          <>
            <Divider bg={"muted.400"} />
            <ColorModeSwitch />
          </>
        )}
      </animated.div>
    </ConditionalWrapper>
  );
});
