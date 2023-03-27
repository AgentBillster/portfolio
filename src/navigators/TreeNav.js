import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { treeIcons } from "../assets/icons/icons";
import { usePrevious } from "../hooks/usePrevious";

const Tree = React.memo(
  ({ onFileClick, children, name, style, defaultOpen = false }) => {
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

    const handleClick = () => {
      if (!children) {
        onFileClick(name);
      }
      setOpen(!isOpen);
    };

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
            width: "15px",
            height: "15px",
            marginRight: "10px",
            verticalAlign: "middle",
          }}
        />
        <span
          onClick={handleClick}
          style={{ ...style, verticalAlign: "middle" }}
        >
          {name}
        </span>
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
  }
);

export const TreeNav = ({ data, setActiveFile }) => {
  const handleFileClick = (fileName) => {
    setActiveFile(fileName);
  };
  const renderTree = (node) => (
    <Tree
      name={node.name}
      defaultOpen={node.defaultOpen}
      onFileClick={handleFileClick}
    >
      {node.children && node.children.map((child) => renderTree(child))}
    </Tree>
  );

  return <div>{data.map((node) => renderTree(node))}</div>;
};
