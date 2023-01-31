import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarMinimal from "../components/TabBarMinimal";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import WorkScreen from "../screens/WorkScreen";
import ContactScreen from "../screens/ContactScreen";
import { Button } from "react-native-web";
import TabHeaderMinimal from "../components/TabHeaderMinimal";
import { useColorMode } from "native-base";

const Tab = createBottomTabNavigator();
const linking = {
  prefixes: [
    "http://localhost:3000",
    "https://localhost:3000",
    "https://.*localhost:3000",
  ],
  config: {
    screens: {
      Home: "home/",
      works: "works/",
      contact: "contact/",
    },
  },
};

const AppNavigator = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <NavigationContainer linking={linking}>
        <Tab.Navigator
          screenOptions={{
            header: (props) => <TabHeaderMinimal {...props} />,
          }}
          tabBar={(props) => <TabBarMinimal {...props} />}
        >
          <Tab.Screen name="home" component={HomeScreen} />
          <Tab.Screen name="works" component={WorkScreen} />
          <Tab.Screen name="contact" component={ContactScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
