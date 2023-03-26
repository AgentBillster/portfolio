import {
  Pressable,
  Center,
  useColorMode,
  SunIcon,
  MoonIcon,
} from "native-base";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Center flex={0.2}>
      <Pressable onPress={toggleColorMode}>
        {colorMode === "light" ? <SunIcon size="8" /> : <MoonIcon />}
      </Pressable>
    </Center>
  );
};

export default ColorModeSwitch;
