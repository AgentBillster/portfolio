import { View, Text } from "react-native";
import React from "react";
import { Box, Button, Center } from "native-base";

const ProjectCard = ({ title, description, i, onPress }) => {
  return (
    <Box bg="white" w={400} h={500}>
      <Text style={{ fontWeight: "bold" }}>{title}</Text>
      <Text>{description}</Text>
      <Button onPress={onPress} w={40} m="auto">
        go
      </Button>
    </Box>
  );
};

export default ProjectCard;
