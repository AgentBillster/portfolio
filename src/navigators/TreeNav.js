import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { usePrevious } from "../hooks/usePrevious";
import { treeIcons } from "../assets/icons/icons";
import { Box, Pressable, Text, useBreakpointValue } from "native-base";

const Tree = React.memo(
  ({
    setActiveFile,
    activeFile,
    type,
    children,
    name,
    style,
    defaultOpen = false,
  }) => {
    const [isOpen, setOpen] = useState(defaultOpen);
    const previous = usePrevious(isOpen);
    const bg = activeFile === name ? "muted.600" : "";
    const fontSize = useBreakpointValue({
      base: "1em",
      sm: "1em",
      md: "0.9em",
      lg: "0.9em",
      xl: "1em",
      xxl: "2em",
    });

    const [ref, { height: viewHeight }] = useMeasure();

    const { height, opacity, y } = useSpring({
      from: { height: 0, opacity: 0, y: 0 },
      to: {
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : 20,
      },
    });

    const iconMap = {
      ".js": treeIcons["JSIcon"],
      ".md": treeIcons["MDIcon"],
    };

    const Icon = children
      ? isOpen
        ? treeIcons["ChevronDown"]
        : treeIcons["ChevronRight"]
      : iconMap[type];

    const handleClick = () => {
      if (!children) {
        setActiveFile(name);
      }
      setOpen(!isOpen);
    };

    return (
      <div>
        <Pressable
          onPress={handleClick}
          position={"relative"}
          style={{
            paddingInline: "4px",
            paddingBlock: "3px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            alignItems: "center",
            fill: "white",
          }}
          bg={bg}
          _hover={{ bg: "muted.700" }} // add hover effect
          flex="1"
          flexDirection={"row"}
        >
          <Icon
            style={{
              width: "5%",
              height: "5%",
              marginRight: "6px",
              verticalAlign: "middle",
            }}
          />
          <Text
            fontSize={fontSize}
            style={{
              ...style,
              verticalAlign: "middle",
              color: "white",
            }}
          >
            {name}
          </Text>
        </Pressable>
        <a.div
          style={{
            opacity,
            height: isOpen && previous === isOpen ? "auto" : height,
            marginLeft: "3px",
            padding: "0px 0px 0px 8px",
            overflow: "hidden",
          }}
        >
          <a.div ref={ref} style={{ y }} children={children} />
        </a.div>
      </div>
    );
  }
);

export const TreeNav = ({ data, setActiveFile, activeFile }) => {
  const renderTree = (node) => (
    <Tree
      name={node.name}
      type={node.name.slice(-3)}
      activeFile={activeFile}
      setActiveFile={setActiveFile}
      defaultOpen={node.defaultOpen}
    >
      {node.children && node.children.map((child) => renderTree(child))}
    </Tree>
  );

  return (
    <Box flex={0.25} bg={"rgb(37,37,37)"}>
      {data.map((node) => renderTree(node))}
    </Box>
  );
};
