import React, { useRef, useState, useEffect } from "react";
import useMeasure from "react-use-measure";
import * as Icons from "../assets/icons/icons";
import { animated, useSpring } from "@react-spring/web";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Tree = React.memo(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);

  const previous = usePrevious(isOpen);
  const [ref, { height: viewHeight }] = useMeasure();
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  });

  const Icon =
    Icons[`${children ? (isOpen ? "Minus" : "Plus") : "Close"}SquareO`];

  return (
    <div
      style={{
        position: "relative",
        padding: "4px 0px 0px 0px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        verticalAlign: "middle",
        color: "#24292e",
        fill: "#24292e",
      }}
    >
      <Icon
        style={{
          width: "1em",
          height: "1em",
          marginRight: 10,
          cursor: "pointer",
          verticalAlign: "middle",
          opacity: children ? 1 : 0.3,
        }}
        onClick={() => setOpen(!isOpen)}
      />
      <span
        style={{
          verticalAlign: "middle",
        }}
      >
        {name}
      </span>
      <animated.div
        style={{
          opacity,
          marginLeft: "8",
          padding: "0px 0px 0px 14px",
          borderLeft: "1px dashed rgba(255, 255, 255, 0.4)",
          overflow: "hidden",
          //   marginl: 6px;
          //   padding: 0px 0px 0px 14px;
          //   border-left: 1px dashed rgba(255, 255, 255, 0.4);
          //   overflow: hidden;
          height: isOpen && previous === isOpen ? "auto" : height,
        }}
      >
        <animated.div ref={ref} style={{ y }} children={children} />
      </animated.div>
    </div>
  );
});

const TreeNav = () => {
  return (
    <div
      style={{
        width: "100%",
        height: " 100%",
        margin: "0",
        padding: "0",
        overflow: "hidden",
        fontSize: "14px",
        lineHeight: "21px",
        // --webkit-user-select: "none",
        // user-select: "none",
        display: "flex",
        alignItems: " center",
        height: "100%",
        justifyContent: " center",
      }}
    >
      <Tree name="main" defaultOpen>
        <Tree name="subtree with children">
          <Tree name="sub-subtree with children">
            <Tree name="child 1" style={{ color: "#37ceff" }} />
          </Tree>
        </Tree>
      </Tree>
    </div>
  );
};

export default TreeNav;

{
  /* <Tree name="custom content">
  <div
    style={{
      position: "relative",
      width: "100%",
      height: 200,
      padding: 10,
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "black",
        borderRadius: 5,
      }}
    />
  </div>
</Tree> */
}
