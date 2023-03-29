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
    <Pressable
      flex="0.2"
      justifyContent={"center"}
      alignItems="center"
      onPress={toggleColorMode}
    >
      {colorMode === "light" ? (
        <SunIcon size={[40, 30, 50, 60]} />
      ) : (
        <MoonIcon size={[40, 30, 50, 70]} />
      )}
    </Pressable>
  );
};

export default ColorModeSwitch;
