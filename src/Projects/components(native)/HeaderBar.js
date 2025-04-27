import { HStack, View } from "native-base";

export const HeaderBar = ({ title, rightButton, leftButton }) => {
  return (
    <HStack bg={"color"} w="95%" alignSelf={"center"} h="8%" p={2}>
      <View alignItems={"center"} justifyContent={"center"} flex="0.15">
        {leftButton && leftButton}
      </View>

      <View
        alignItems={"center"}
        justifyContent={"center"}
        borderColor={"white"}
        flex="0.7"
        p="6px"
      >
        {title}
      </View>

      <View p="3px" alignItems={"center"} justifyContent={"center"} flex="0.15">
        {rightButton && rightButton}
      </View>
    </HStack>
  );
};
