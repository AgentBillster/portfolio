import { Center, HStack, useBreakpointValue } from "native-base";

export const NavWidget = ({ buttons }) => {
  const p = useBreakpointValue({
    base: "2%",
    sm: "2%",
    md: "2%",
    lg: "2%",
    xl: "2%",
    xxl: "3%",
  });
  return (
    <Center
      w="100%"
      position={"absolute"}
      flexDir={"row"}
      zIndex={2}
      bottom={"1%"}
    >
      <HStack
        p={p}
        bg="rgb(240,240,240)"
        borderRadius={"35px"}
        space={"0.7em"}
        style={{
          boxShadow: "0px 0px 16px 0px rgba(0,0,0,0.55)",
        }}
      >
        {buttons.map((button, index) => button)}
      </HStack>
    </Center>
  );
};
