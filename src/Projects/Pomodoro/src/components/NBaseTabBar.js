import {
  Box,
  PresenceTransition,
  Pressable,
  Divider,
  HStack,
  Text,
} from "native-base";

export const NBaseTabBar = ({ tabs, handleTabToggle, isOpen }) => {
  return (
    <Box p="4">
      <HStack>
        {tabs.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              handleTabToggle(item);
            }}
            w="50%"
            p={2}
          >
            <Text textAlign={"center"}>{item}</Text>
          </Pressable>
        ))}
      </HStack>
      <PresenceTransition
        visible={isOpen}
        exit={{
          translateX: 0,
          transition: {
            type: "spring",
          },
        }}
        animate={{
          translateX: 160,
          transition: {
            type: "spring",
            useNativeDriver: false,
          },
        }}
      >
        <Divider w={"50%"} borderWidth={"1"} bg="white" />
      </PresenceTransition>
    </Box>
  );
};
