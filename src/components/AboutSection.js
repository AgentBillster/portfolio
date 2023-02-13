import { View, Text } from "react-native";
import React from "react";
import { HStack, VStack, Heading, Center, Image, Divider } from "native-base";

const AboutSection = ({ style }) => {
  return (
    <VStack
      style={{
        ...style,
      }}
    >
      <HStack w={"100%"} justifyContent="space-evenly">
        <Center borderRadius={"full"} overflow={"hidden"}>
          <Image
            source={require("../assets/images/me.jpg")}
            alt="Alternate Text"
            size="xl"
          />
        </Center>
      </HStack>

      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
    </VStack>
  );
};

export default AboutSection;
