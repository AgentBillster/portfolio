import { Box, HStack, StatusBar, Text } from "native-base";

export const NBaseHeader = ({ title, color }) => {
  return (
    <>
      <StatusBar bg={color} barStyle="light-content" />
      <Box safeAreaTop bg="violet.400" />
      <HStack
        bg={color}
        px="1"
        py="3"
        h={"20%"}
        justifyContent="center"
        alignItems="center"
        w="100%"
        maxW="350"
      >
        <Text
          color="black"
          fontSize={["10px", "20px", "35px"]}
          fontWeight="bold"
        >
          {title}
        </Text>
      </HStack>
    </>
  );
};
