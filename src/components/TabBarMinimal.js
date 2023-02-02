import { Text, useColorMode } from "native-base";
import { Link, useLinkTo } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useSpring, animated, useSpringValue } from "@react-spring/web";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const barheight = height * 0.1;

const TabBarMinimal = ({ state, descriptors, navigation }) => {
  const linkTo = useLinkTo();
  const { colorMode, toggleColorMode } = useColorMode();
  const colorvalue = useSpringValue();

  const bg = useSpring({
    background: colorMode === "light" ? "white" : "#202023",
  });

  const handleToggle = () => {
    toggleColorMode();
    // colorMode === "light" ? colorvalue.start(1) : colorvalue.start(0);
  };
  return (
    <animated.div
      style={{
        ...bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: barheight,
        width,
        zIndex: 1,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        return (
          <Link
            style={{
              boxshadow: "0px 20 10px rgba(0, 0, 0, 0.8);",
            }}
            to={{ screen: route.name, merge: true }}
          >
            <Text fontSize={"30"}>{label}</Text>
          </Link>

          // <Pressable
          //   accessibilityRole="button"
          //   accessibilityState={isFocused ? { selected: true } : {}}
          //   accessibilityLabel={options.tabBarAccessibilityLabel}
          //   onPress={onPress}
          //   textDecoration="none"
          // >
          //   <Text fontSize={30}>{label}</Text>
          // </Pressable>
        );
      })}
    </animated.div>
  );
};

export default TabBarMinimal;
