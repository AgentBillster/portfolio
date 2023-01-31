import { Box, Pressable, Switch, Text, useColorMode } from "native-base";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch position={"fixed"} zIndex="100" onValueChange={toggleColorMode} />
  );
};

export default ColorModeSwitch;
