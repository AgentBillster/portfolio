import React from "react";
import {
  Text,
  Box,
  Container,
  Center,
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import AppNavigator from "./navigators/AppNavigator";

// import { Dimensions } from "react-native-web";

const App = () => {
  const theme = extendTheme({
    components: {
      Text: {
        defaultProps: {
          _light: { color: "black" },
          _dark: { color: "lightgray" },
        },
      },
    },

    colors: {
      background: "white",
      primary: {
        50: "#E3F2F9",
        100: "#C5E4F3",
        200: "#A2D4EC",
        300: "#7AC1E4",
        400: "#47A9DA",
        500: "#0088CC",
        600: "#007AB8",
        700: "#006BA1",
        800: "#005885",
        900: "#003F5E",
      },
    },

    config: {
      // Changing initialColorMode to 'dark'
      // initialColorMode: "dark",
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;
