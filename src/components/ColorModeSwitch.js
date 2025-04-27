import {
  Pressable,
  useColorMode,
  SunIcon,
  MoonIcon,
  useBreakpointValue,
} from "native-base";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const size = useBreakpointValue({
    lg: "35px",
    xl: "30px",
    xxl: "42px",
  });

  return (
    <Pressable
      flex="0.15"
      justifyContent={"center"}
      alignItems="center"
      onPress={toggleColorMode}
    >
      {colorMode === "light" ? (
        <SunIcon size={"1.8em"} />
      ) : (
        <MoonIcon size={size} />
      )}
    </Pressable>
  );
};

export default ColorModeSwitch;
