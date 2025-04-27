import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  Center,
  CheckIcon,
  PresenceTransition,
  useMediaQuery,
} from "native-base";
import { breakpoints } from "../../theme";

export const PostOverlay = React.memo(({ isDone, children, color }) => {
  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });
  const [animDone, set] = useState(false);

  return (
    <>
      <View
        style={{
          width: isMobile ? "40vh" : "16vw",
          height: isMobile ? "40vh" : "16vw",
          borderRadius: "50%",
          borderWidth: 1,
          borderColor: "gray",
          transform: "translateY(-2.2em)",
        }}
      >
        <PresenceTransition
          onTransitionComplete={(val) => val === "entered" && set(true)}
          visible={isDone}
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 45,
              mass: 0.7,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0,
          }}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(80,80,80, 0.5)",
            borderRadius: "50%",
          }}
        >
          <Center
            borderRadius={"50%"}
            size={"90%"}
            borderWidth={1}
            borderColor={color}
          >
            {animDone ? (
              <PresenceTransition
                style={{
                  width: "80%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                visible={animDone}
              >
                {children}
              </PresenceTransition>
            ) : (
              <CheckIcon size="40%" />
            )}
          </Center>
        </PresenceTransition>
      </View>
      <View flex="0.19" />
    </>
  );
});
