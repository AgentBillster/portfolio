import { Center } from "native-base";
import React from "react";
import { animated, useSpring } from "@react-spring/web";

export const Wheel = React.memo(
  ({ text, size = "120px", fontSize = "2.5em", style }) => {
    const clockwiseProps = useSpring({
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(-360deg)" },
      config: { duration: 30000 },
      reset: true,
      loop: true,
    });

    const counterClockwiseProps = useSpring({
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(-360deg)" },
      config: { duration: 15000 },
      reset: true,
      loop: true,
    });

    return (
      <animated.div style={{ ...clockwiseProps }}>
        <Center w={size} h={size} style={style}>
          <svg
            viewBox="0 0 500 500"
            style={{
              width: size,
              letterSpacing: "15px",
              fontSize: fontSize,
              fontFamily: "Light",
              textTransform: "uppercase",
            }}
          >
            <path
              id="curve"
              fill="transparent"
              d="M250 22.5C124.4 22.5 22.5 124.4 22.5 250S124.4 477.5 250 477.5 477.5 375.6 477.5 250c0-125.1-101-226.7-226-227.5H250"
            />

            <text fill="gray" width={size} xmlSpace="preserve">
              <textPath href="#curve">{`${text}  →  ${text}  →  ${text}  →  `}</textPath>
            </text>
          </svg>
          <animated.div
            style={{ ...counterClockwiseProps, position: "absolute" }}
          >
            <span style={{ fontSize: "1.2em", color: "#808080" }}>★</span>
          </animated.div>
        </Center>
      </animated.div>
    );
  }
);
