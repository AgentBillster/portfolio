import {
  Box,
  Pressable,
  Switch,
  Text,
  Center,
  useColorMode,
} from "native-base";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Center flex={0.2}>
      <Switch
        offTrackColor="orange.500"
        onTrackColor="orange.200"
        onThumbColor="orange.500"
        offThumbColor="orange.50"
        onValueChange={toggleColorMode}
        style={{ transform: [{ rotate: "-90deg" }] }}
      />
    </Center>
  );
};

export default ColorModeSwitch;
