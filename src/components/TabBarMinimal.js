import { Pressable, Text, View, Box, HStack, useColorMode } from "native-base";
import { useLinkTo } from "@react-navigation/native";
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

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          // linkTo('/profile/jane')
          if (!isFocused && !event.defaultPrevented) {
            console.log("the merge thing");
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
          >
            <Text fontSize={30}>{label}</Text>
          </Pressable>
        );
      })}
    </animated.div>
  );
};

export default TabBarMinimal;
