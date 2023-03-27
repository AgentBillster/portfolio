import { ScrollView } from "native-base";
import { useRef, useState } from "react";
import { PanResponder } from "react-native";

// gives react native drag gesture behavior on the web
export const ScrollViewPlus = ({ children, platform = "web" }) => {
  const scrollViewRef = useRef(null);
  const [previousY, setPreviousY] = useState(0);

  const handlePanResponderMove = (evt, gestureState) => {
    const { dy } = gestureState;
    const newScrollY = previousY - dy / 2;
    scrollViewRef.current.scrollTo({ y: newScrollY, animated: false });
  };

  const handlePanResponderRelease = (evt, gestureState) => {
    const { dy } = gestureState;
    const prev = previousY - dy;
    setPreviousY(prev < 0 ? 0 : prev);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
  });

  if (platform === "web") {
    return <ScrollView p="4">{children}</ScrollView>;
  }

  return (
    <ScrollView
      p="4"
      showsVerticalScrollIndicator={false}
      {...panResponder.panHandlers}
      ref={scrollViewRef}
    >
      {children}
    </ScrollView>
  );
};
