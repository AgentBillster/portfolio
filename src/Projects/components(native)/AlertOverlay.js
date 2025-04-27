import { PresenceTransition, Pressable } from "native-base";
import React from "react";

export const AlertOverlay = React.memo(
  ({ visible, onBodyPress, children, fadeDuration, fadeOpacity }) => {
    return (
      <PresenceTransition
        visible={visible}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: fadeDuration,
          },
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundColor: `rgba(0,0,0, ${fadeOpacity})`,
          zIndex: 10,
        }}
      >
        <Pressable
          w={"100%"}
          h="100%"
          alignItems={"center"}
          justifyContent={"center"}
          onPress={() => onBodyPress && onBodyPress()}
        >
          {children}
        </Pressable>
      </PresenceTransition>
    );
  }
);
