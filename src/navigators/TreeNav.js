import React, { useRef, useState, useEffect } from "react";
import { useSpring, a } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { treeIcons } from "../assets/icons/icons";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
};

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
    treeIcons[
      `${children ? (isOpen ? "ChevronDown" : "ChevronRight") : "JSIcon"}`
    ];

  return (
    <div
      style={{
        position: "relative",
        paddingInline: "7px",
        paddingBlock: "3px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        color: "white",
        fill: "white",
      }}
    >
      <Icon
        style={{
          width: "16px",
          height: "16px",
          marginRight: "10px",
          verticalAlign: "middle",
        }}
        onClick={() => setOpen(!isOpen)}
      />
      <span style={{ ...style, verticalAlign: "middle" }}>{name}</span>
      <a.div
        style={{
          opacity,
          height: isOpen && previous === isOpen ? "auto" : height,
          marginLeft: "6px",
          padding: "0px 0px 0px 14px",
          borderLeft: "1px dashed rgba(80,80,80)",
          overflow: "hidden",
        }}
      >
        <a.div ref={ref} style={{ y }} children={children} />
      </a.div>
    </div>
  );
});

export const TreeNav = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0",
        padding: " 0",
        overflow: "hidden",
        fontSize: "14px",
        lineHeight: "21px",
        userSelect: "none",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Tree name={"App_Name"} defaultOpen>
        <Tree name="src">
          <Tree name="components">
            <Tree name="component1" />
            <Tree name="component1" />
          </Tree>
          <Tree name="screens">
            <Tree name="screen1" />
            <Tree name="screen2" />
          </Tree>
          <Tree name="app" />
        </Tree>
      </Tree>
    </div>
  );
};
