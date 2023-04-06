import {
  Pressable,
  useColorMode,
  SunIcon,
  MoonIcon,
} from "native-base";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Pressable
      flex="0.15"
      justifyContent={"center"}
      alignItems="center"
      onPress={toggleColorMode}
    >
      {colorMode === "light" ? (
        <SunIcon size={[10, 30, 50, 60]} />
      ) : (
        <MoonIcon size={[10, 30, 50, 70]} />
      )}
    </Pressable>
  );
};

export default ColorModeSwitch;
