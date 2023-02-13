import { View, Text } from "react-native";
import React from "react";

const AnimatedPanel = ({ children, style }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartY(event.clientY);
    setStartScrollTop(scrollRef.current.scrollTop);
    event.preventDefault();
  };

  const handleMouseUp = (event) => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const diff = event.clientY - startY;
    scrollRef.current.scrollTop = startScrollTop - diff;
    event.preventDefault();
  };

  return (
    <animated.div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        ...style,
        height: "100%",
        width: "100%",
        background: "rgba(190, 190, 190, 0.10)",
      }}
    >
      {children}
    </animated.div>
  );
};

export default AnimatedPanel;
