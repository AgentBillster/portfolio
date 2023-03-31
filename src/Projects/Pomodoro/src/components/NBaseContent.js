import {
  Box,
  PresenceTransition,
  Pressable,
  useDisclose,
  Divider,
  Text,
} from "native-base";

export const NBaseContent = ({ isOpen }) => {
  <PresenceTransition
    visible={isOpen}
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
      transition: {
        duration: 250,
        type: "spring",
        useNativeDriver: false,
      },
    }}
  ></PresenceTransition>;
  return (
    <Box flex="1" bg={"white"}>
      <Text>content</Text>
    </Box>
  );
};
