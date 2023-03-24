import { ScrollView } from "native-base";
import { useRef, useState } from "react";
import { PanResponder } from "react-native-web";

export const ScrollViewPlus = (props) => {
  const scrollViewRef = useRef(null);
  const [previousY, setPreviousY] = useState(0);

  const handlePanResponderMove = (evt, gestureState) => {
    const { dy } = gestureState;
    const newScrollY = previousY - dy;
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

  return (
    <ScrollView ref={scrollViewRef} {...panResponder.panHandlers}>
      {props.children}
    </ScrollView>
  );
};
