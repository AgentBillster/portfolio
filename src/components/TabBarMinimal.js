import { Pressable, Text, View, Box, HStack } from "native-base";
import { useLinkTo } from "@react-navigation/native";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const TabBarMinimal = ({ state, descriptors, navigation }) => {
  const linkTo = useLinkTo();

  return (
    <HStack
      h={"12%"}
      space={width / state.routes.length / 1.5}
      justifyContent="center"
      _light={{
        bg: "white",
      }}
      _dark={{ bg: "#202023" }}
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
            <Text
              fontSize={"2xl"}
              style={{ color: isFocused ? "#673ab7" : "#222" }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default TabBarMinimal;
