import { useState } from "react";

export const useNavigation = (initialScreen, screenMap) => {
  const [activeScreen, setActiveScreen] = useState(initialScreen);
  const [props, setProps] = useState({});

  const navigateToScreen = (screenName, screenProps) => {
    if (screenName in screenMap) {
      setActiveScreen(screenName);
      setProps(screenProps || {});
    } else {
      console.error(`Screen '${screenName}' not found in screenMap`);
    }
  };

  const navigateBack = () => {
    console.warn(`'navigateBack' method not implemented`);
  };

  const getScreenComponent = () => {
    if (activeScreen in screenMap) {
      const ScreenComponent = screenMap[activeScreen];
      return <ScreenComponent {...props} navigateToScreen={navigateToScreen} />;
    } else {
      console.error(`Screen '${activeScreen}' not found in screenMap`);
      return null;
    }
  };

  return {
    // activeScreen,
    // navigateToScreen,
    // navigateBack,
    getScreenComponent,
  };
};
