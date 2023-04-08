import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { extendTheme, NativeBaseProvider } from "native-base";
import { LoadingAnim } from "./components/LoadingAnim";
import AnimatedBackground from "./components/AnimatedBackground";
import AnimatedCursor from "react-animated-cursor";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <NativeBaseProvider
    theme={extendTheme({
      breakpoints: [0, 980, 1820, 2460],
      components: {
        Text: {
          variants: {
            bigtext: {
              fontFamily: "Thin",
              fontSize: ["50px", "65px", "100px", "160px"],
            },
            bigsubtext: {
              fontFamily: "thin",
              style: { transform: [{ translateY: "-20px" }] },
              fontSize: ["20px", "20px", "40px", "60px"],
            },

            topnavtext: {
              fontSize: ["16px", "22px", "34px", "50px"],
            },
            navitemtext: {
              fontFamily: "Light",
              borderColor: "rgba(80,80,80, 1)",
              fontSize: ["40px", "20px", "32px", "45px"],
            },

            socialname: {
              fontSize: ["14px", "13px", "20px", "32px"],
            },
            socialemail: {
              fontSize: ["14px", "13px", "18px", "32px"],
            },
            sectionheader: {
              fontSize: ["40px", "28px", "50px", "65px"],
            },

            sectiontext: {
              fontSize: ["16px", "15px", "24px", "35px"],
            },

            workheader: {
              fontSize: ["26px", "50px", "70px", "120px"],
            },

            tagtext: {
              fontSize: ["16px", "15px", "24px", "38px"],
            },

            projtext: {
              fontSize: ["50px", "72px", "108px", "140px"],
            },
          },
        },

        IconButton: {
          defaultProps: {
            cursor: "none",
          },
        },

        Input: {
          defaultProps: {
            _light: { borderColor: "black" },
            _dark: { borderColor: "white" },
          },
        },

        TextArea: {
          defaultProps: {
            _light: { borderColor: "black" },
            _dark: { borderColor: "white" },
          },
        },

        HStack: {
          variants: {
            socialspacing: { space: [10, 10, 20, 10] },
          },
          defaultProps: {
            cursor: "none",
          },
        },

        Pressable: {
          defaultProps: {
            cursor: "none",
          },
        },

        // Switch: {
        //   defaultProps: {
        //     cursor: "none",
        //   },
        // },

        // Pressable: {
        //   defaultProps: {
        //     cursor: "none",
        //   },
        // },

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

          defaultProps: {
            fontFamily: "Light",
            _light: { color: "black" },
            _dark: { color: "white" },
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
        initialColorMode: "light",
      },
    })}
  >
    <LoadingAnim />
    <AnimatedBackground>
      <AnimatedCursor
        color={"150, 150, 150"}
        innerSize={3}
        outerSize={18}
        trailingSpeed={8}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        outerStyle={{
          border: `1px solid rgb(150, 150, 150)`,
        }}
      />
      <App />
    </AnimatedBackground>
  </NativeBaseProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
