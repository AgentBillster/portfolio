import { useState } from "react";

export const useNavigation = (initialScreen, screenMap) => {
  const [activeScreen, setActiveScreen] = useState(initialScreen);

  const navigateToScreen = (screenName) => {
    if (screenName in screenMap) {
      setActiveScreen(screenName);
    } else {
      console.error(`Screen '${screenName}' not found in screenMap`);
    }
  };

  const navigateBack = () => {
    console.warn(`'navigateBack' method not implemented`);
    // You can implement this method to handle navigating back to the previous screen if needed
  };

  const getScreenComponent = () => {
    if (activeScreen in screenMap) {
      return screenMap[activeScreen];
    } else {
      console.error(`Screen '${activeScreen}' not found in screenMap`);
      return null;
    }
  };

  return {
    activeScreen,
    navigateToScreen,
    navigateBack,
    getScreenComponent,
  };
};
