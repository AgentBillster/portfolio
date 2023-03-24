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
      breakpoints: {
        base: 0,
        md: 768,
        lg: 992,
        xl: 1280,
      },

      components: {
        Text: {
          variants: {
            bigtext: {
              fontFamily: "Thin",
              fontSize: [30, 40, 50, 65],
              display: ["none", "none", "flex"],
            },
            bigsubtext: {
              fontFamily: "thin",
              fontSize: [20, 25, 30, 20],
            },

            biotext: {
              fontSize: [10, 12, 14, 16],
            },
          },
        },

        Icon: {
          defaultProps: {
            size: [40, 45, 50, 55],
          },
        },

        // HStack: {
        //   defaultProps: {
        //     cursor: "none",
        //   },
        // },

        // Pressable: {
        //   defaultProps: {
        //     cursor: "none",
        //   },
        // },

        // Switch: {
        //   defaultProps: {
        //     cursor: "none",
        //   },
        // },

        Pressable: {
          defaultProps: {
            cursor: "none",
          },
        },

        Heading: {
          variants: {
            bioheader: {
              fontSize: [10, 20, 30, 30],
              fontFamily: "Thin",
            },

            bioheader_sm: {
              fontSize: [10, 20, 30, 25],
              fontFamily: "Thin",
            },
          },

          // defaultProps: {
          //   fontFamily: "Light",
          //   _light: { color: "black" },
          //   _dark: { color: "white" },
          // },
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
        initialColorMode: "light",
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
reportWebVitals(console.log);
