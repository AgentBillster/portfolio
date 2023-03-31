import { Box, Pressable, HStack, Text } from "native-base";

export const NBaseTabs = ({ tabs, handleTabToggle, activeTab }) => {
  return (
    <Box px="4">
      <HStack>
        {tabs.map((item, index) => (
          <Pressable
            key={index}
            borderBottomWidth={activeTab === item ? 1 : 0}
            onPress={() => {
              handleTabToggle(item);
            }}
            w="49%"
            p={2}
          >
            <Text
              color="black"
              fontSize={["12px", "20px", "28px", "32px"]}
              fontFamily="Light"
              textAlign={"center"}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </HStack>
    </Box>
  );
};
