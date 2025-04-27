import React from "react";
import SocialLinks from "./SocialLink";
import { PresenceTransition, Text, VStack, useMediaQuery } from "native-base";
import { breakpoints } from "../theme";

export const Title = React.memo(({ demoData, currentPage }) => {
  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });

  return (
    <PresenceTransition
      style={{
        zIndex: demoData && -2,
        width: "65%",
        position: "absolute",
        left: !isMobile && "6%",
      }}
      visible={!demoData && currentPage !== "contact"}
      initial={{
        translateX: -100,
        opacity: 0,
      }}
      animate={{
        translateX: 0,
        opacity: 1,
        transition: {
          type: "spring",
        },
      }}
      exit={{
        translateX: -100,
        opacity: 1,
        transition: {
          type: "spring",
        },
      }}
    >
      <VStack p="3.8%" mt="4%" w={"100%"}>
        <Text variant="title">William Wilson</Text>
        <Text variant="titleSub">Software Engineer</Text>
      </VStack>
      <SocialLinks />
    </PresenceTransition>
  );
});
