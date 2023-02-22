import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { extendTheme, NativeBaseProvider } from "native-base";
import { NavigationProvider } from "./providers/NavigationProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <NativeBaseProvider
    theme={extendTheme({
      components: {
        Text: {
          defaultProps: {
            _light: { color: "black" },
            _dark: { color: "lightgray" },
            fontFamily: "Book",
          },
        },

        Pressable: {
          defaultProps: {
            cursor: "none",
          },
        },

        Switch: {
          defaultProps: {
            cursor: "none",
          },
        },

        Heading: {
          defaultProps: {
            _light: { color: "black" },
            _dark: { color: "lightgray" },
            fontFamily: "Thin",
            fontSize: "50",
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
    })}
  >
    <NavigationProvider>
      <App />
    </NavigationProvider>
  </NativeBaseProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
