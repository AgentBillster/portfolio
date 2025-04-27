import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { extendTheme, NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import AnimatedCursor from "react-animated-cursor";
import AnimatedBackground from "./components/AnimatedBackground";
import { LoadingAnim } from "./components/LoadingAnim";
const root = ReactDOM.createRoot(document.getElementById("root"));
const nativeBaseTheme = extendTheme(theme);

root.render(
  <NativeBaseProvider theme={nativeBaseTheme}>
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
    {/* <LoadingAnim /> */}

    <AnimatedBackground>
      <App />
    </AnimatedBackground>
  </NativeBaseProvider>
);
