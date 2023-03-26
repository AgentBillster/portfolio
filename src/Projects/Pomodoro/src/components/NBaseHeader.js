import {
  ArrowBackIcon,
  Box,
  HStack,
  Icon,
  IconButton,
  StatusBar,
  Text,
} from "native-base";

export const NBaseHeader = ({ title }) => {
  return (
    <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="violet.400" />
      <HStack
        bg="muted.800"
        px="1"
        py="3"
        h={"20%"}
        justifyContent="center"
        alignItems="center"
        w="100%"
        maxW="350"
      >
        <Text color="white" fontSize="20" fontWeight="bold">
          {title}
        </Text>
      </HStack>
    </>
  );
};
