import {
  Box,
  Pressable,
  Switch,
  Text,
  Center,
  useColorMode,
  HStack,
  Divider,
  Checkbox,
  Hidden,
  VStack,
  SunIcon,
  MoonIcon,
} from "native-base";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Center flex={0.20}>

      <Pressable onPress={toggleColorMode}>
        {colorMode === 'light' ? <SunIcon size="8" /> : <MoonIcon />}
      </Pressable>

    </Center>
  );
};

export default ColorModeSwitch;
