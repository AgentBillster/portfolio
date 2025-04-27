import { PresenceTransition } from "native-base";
import React from "react";

export const SlideAnimation = React.memo(
  ({ visible, axis, from, to, speed, children, style }) => {
    let initialTransform = {};
    let animateTransform = {};

    if (axis === "x") {
      initialTransform = { opacity: 0, translateX: from };
      animateTransform = { opacity: 1, translateX: to };
    } else if (axis === "y") {
      initialTransform = { opacity: 0, translateY: from };
      animateTransform = { opacity: 1, translateY: to };
    }

    return (
      <PresenceTransition
        style={style}
        visible={visible}
        initial={initialTransform}
        animate={{
          animateTransform,
          transition: { type: "spring", stiffness: speed },
        }}
      >
        {children}
      </PresenceTransition>
    );
  }
);
