import React, { useEffect, useRef, useState } from "react";
import { Spring, animated } from "@react-spring/web";
import {
  ArrowUpIcon,
  Box,
  Center,
  HStack,
  IconButton,
  PresenceTransition,
  ScrollView,
  VStack,
  View,
  useBreakpointValue,
  useColorMode,
  useMediaQuery,
} from "native-base";
import { TreeNav } from "../navigators/TreeNav";
import { CodeViewer } from "../components/CodeViewer";
import { ConditionalWrapper } from "../components/ConditionalWrapper";
import { breakpoints } from "../theme";
import { BatteryIcon, WifiIcon } from "../assets/icons/icons";
import { Clock } from "../Projects/components(native)/Clock";

const FIRSTCOLOR = "rgb(200,200,200)";
const MIDDLECOLOR = "rgb(155,155,155)";
const LASTCOLOR = "rgb(20,20,20)";

export const DemoScreen = React.memo(({ navigate, data }) => {
  const [activeFile, setActiveFile] = useState("Readme.md");
  const [orientation, setOrientation] = useState(null);
  const [reverse, setReverse] = useState(false);
  const [showApp, setShowApp] = useState(false);

  const { toggleColorMode } = useColorMode();
  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });
  const ScrollRef = useRef();

  useEffect(() => {
    function handleOrientationChange() {
      if (window.orientation === 0 || window.orientation === 180) {
        setOrientation("portrait");
      } else {
        setOrientation("landscape");
      }
    }
    window.addEventListener("orientationchange", handleOrientationChange);
    handleOrientationChange();
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  const handleAnimDone = () => {
    if (reverse) {
      toggleColorMode();
      navigate("work");
    } else {
      setShowApp(true);
    }
  };

  const closeApp = () => {
    setReverse(true);
    setTimeout(() => {
      setShowApp(false);
    }, 50);
  };

  const viewCode = () => {
    ScrollRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View w={"100%"} h="100%" position={"absolute"} left={0}>
      <PresenceTransition
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          zIndex: 2,
        }}
        visible={showApp}
        initial={{ opacity: 0, translateY: -28 }}
        animate={{
          opacity: 1,
          transformY: 0,
          transition: { type: "spring", speed: 1, bounciness: 100 },
        }}
      >
        <ScrollView ref={ScrollRef} w="100%" h="100%" scrollEnabled={false}>
          {orientation === "landscape" && window.innerHeight < 500 ? null : (
            <Center w="100%" h={window.innerHeight}>
              <ConditionalWrapper
                condition={!isMobile}
                wrapper={(children) => (
                  <DeviceFrame
                    color={
                      data.fileTree[0].name === "Pomodoro"
                        ? "rgba(127,64,64, 1)"
                        : "rgba(0, 172, 170, 0.9)"
                    }
                  >
                    {children}
                  </DeviceFrame>
                )}
              >
                {data.app(closeApp, viewCode)}
              </ConditionalWrapper>
            </Center>
          )}

          <HStack w="100%" h={window.innerHeight}>
            {!isMobile && (
              <VStack w="3%" h="100%" bg="rgb(51,51,51)">
                <IconButton
                  onPress={() =>
                    ScrollRef.current.scrollTo({ y: 0, animated: true })
                  }
                  icon={<ArrowUpIcon size={"1em"} />}
                />
              </VStack>
            )}
            <TreeNav
              data={data.fileTree}
              setActiveFile={setActiveFile}
              activeFile={activeFile}
            />
            <CodeViewer activeFile={activeFile} app={data.fileTree[0].name} />
          </HStack>
        </ScrollView>
      </PresenceTransition>
      <DropAnim reverse={reverse} handleAnimDone={handleAnimDone} />
    </View>
  );
});

// change l8r
class DropAnim extends React.PureComponent {
  state = { items: [FIRSTCOLOR, MIDDLECOLOR, LASTCOLOR] };

  render() {
    const { items } = this.state;
    const { reverse, handleAnimDone } = this.props;
    return (
      <Trail
        native
        onRest={handleAnimDone}
        reverse={reverse}
        from={{ y: reverse ? 100 : 0 }}
        to={{ y: reverse ? 0 : 100 }}
        keys={items}
      >
        {items.map((item, index) => ({ y }) => (
          <animated.div
            style={{
              width: "100%",
              position: "absolute",
              borderRadius: index < 2 && "20px",
              zIndex: -1,
              backgroundColor: item,
              height: y.interpolate((y) => `${y}%`),
            }}
          />
        ))}
      </Trail>
    );
  }
}

const Trail = ({
  children,
  delay = 350,
  ms = 200,
  reverse = false,
  keys,
  onRest,
  ...props
}) =>
  children.map((child, i) => {
    return (
      <Spring
        key={keys[i]}
        {...props}
        delay={delay + (reverse ? children.length - i : i) * ms}
        onRest={i === (reverse ? 0 : children.length - 1) ? onRest : null}
        children={child}
        config={{
          type: "spring",
          mass: 10,
          clamp: true,
        }}
      />
    );
  });

const DeviceFrame = ({ children, color }) => {
  const deviceWidth = useBreakpointValue({
    lg: "342px",
    xl: "360px",
    xxl: "420px",
  });
  const deviceHeight = useBreakpointValue({
    lg: "652px",
    xl: "675px",
    xxl: "800px",
  });
  return (
    <View
      style={{
        width: deviceWidth,
        height: deviceHeight,
        borderRadius: "38.5px",
        overflow: "hidden",
        boxShadow: `0px 0px 1px 1px rgb(10, 10, 10), 0px 0px 1px 5px rgba(0, 1, 0, 1), 0px 0px 1px 7px rgba(44, 44, 44, 1), 0px 0px 0.5px 9px rgba(110, 110, 110, 1)`,
      }}
    >
      <HStack w="100%" p="2%" h="8%" top={0} bg="black">
        <Center flex="0.3">
          <Clock />
        </Center>

        <Center flex="0.4" fontWeight="bold">
          <Box
            w="75%"
            h="70%"
            bg="black"
            borderRadius={"38.5px"}
            borderWidth={1}
            borderColor={color}
          />
        </Center>

        <HStack
          space={"4"}
          flex={0.3}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <WifiIcon size={"20px"} />
          <BatteryIcon size={"28px"} />
        </HStack>
      </HStack>

      {children}
    </View>
  );
};