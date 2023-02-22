import { View, Text } from "react-native";
import React from "react";
import { HStack, VStack, Heading, Center, Image, Divider } from "native-base";

const SkillSection = ({ style }) => {
  const skills = ["React Native"];
  return (
    <VStack
      style={{
        ...style,
      }}
    >
      <Heading ml={5} fontSize={"75"} fontFamily="Thin">
        Skills
      </Heading>
      <Divider
        borderRadius={"full"}
        h="1px"
        w={"30%"}
        bgColor={"rgba(20, 20, 20, 0.7)"}
      />
      <VStack space={5}>
        <HStack space={50}>
          <Text style={{ fontSize: 20 }}>{`\u2023 Skill`}</Text>
          <Text style={{ fontSize: 20 }}>{`\u2023 Skill`}</Text>
        </HStack>
        <HStack space={50}>
          <Text style={{ fontSize: 20 }}>{`\u2023 Skill`}</Text>
          <Text style={{ fontSize: 20 }}>{`\u2023 Skill`}</Text>
        </HStack>
        <HStack space={50}>
          <Text style={{ fontSize: 20 }}>{`\u2023 Skill`}</Text>
          <Text style={{ fontSize: 20 }}>{`\u2023 Skill`}</Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default SkillSection;
