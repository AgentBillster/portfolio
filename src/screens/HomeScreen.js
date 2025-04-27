import React from "react";
import {
  Box,
  Text,
  VStack,
  Image,
  View,
  useMediaQuery,
  useBreakpointValue,
  Center,
  Pressable,
} from "native-base";
import SocialLinks from "../components/SocialLink";
import { breakpoints } from "../theme";
import { DownloadIcon } from "../assets/icons/icons";
import { Wheel } from "../components/Wheel";
import { SlideAnimation } from "../components/SlideAnimation";

const HomeScreen = () => {
  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });
  const [isPhone] = useMediaQuery({ maxWidth: breakpoints.md });
  const wheelSize = useBreakpointValue({
    lg: "180",
    xl: "200",
    xxl: "325",
  });

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/William Wilson.pdf";
    link.download = "William Wilson";
    link.click();
  };

  if (isPhone) {
    return (
      <SlideAnimation
        style={{
          alignItems: "center",
        }}
        visible={true}
        axis="y"
        from={10}
        to={0}
        speed={50}
      >
        <Text variant="title">William Wilson</Text>
        <Text variant="titleSub">Software Engineer</Text>
        <Box py="1%">
          <SocialLinks />
        </Box>
        <Box h="64%" w="100%">
          <MyImage />
        </Box>
        <Center>
          <Text mt="2%" whiteSpace="nowrap" variant={"titleTextHeader"}>
            A bit about me.
          </Text>
          <Text
            p="2%"
            variant={"titleTextContent"}
            textAlign={window.innerWidth < 500 ? "center" : "left"}
          >
            As a passionate Full Stack Engineer with a strong commitment to the
            craft, I have always been an ardent advocate of simplicity and
            efficiency in my work. I view technology as a force multiplier for
            functional creativity and I strive to incorporate these values into
            each line of code I write.
          </Text>
        </Center>
        <Pressable
          alignItems={"center"}
          flexDir={"row"}
          justifyContent="center"
          onPress={handleDownload}
          w="80%"
          _pressed={{ bg: "muted.300" }}
        >
          <DownloadIcon size={"1.1em"} />
          <Text fontFamily={"Light"} ml="4%" fontSize={"1.1em"}>
            Download Resume
          </Text>
        </Pressable>
      </SlideAnimation>
    );
  }

  return (
    <View mx={"6%"} my="5%" flex={1}>
      {/* Image  */}
      <SlideAnimation
        visible={true}
        axis="y"
        from={100}
        to={0}
        style={{
          height: isMobile ? "60%" : "52%",
          width: isMobile ? "50%" : "32%",
          marginTop: isMobile ? "35%" : "auto",
        }}
      >
        <MyImage />
      </SlideAnimation>

      {/* TextBlock  */}
      <SlideAnimation
        visible={true}
        axis="x"
        from={100}
        to={0}
        style={{
          space: "2em",
          zIndex: 2,
          alignItems: "flex-start",
          position: "absolute",
          right: "0",
          top: isMobile ? "12%" : "10%",
          width: isMobile ? "41%" : "33%",
        }}
      >
        <Bio />
        {isMobile && (
          <Box mt="10%" alignSelf={"center"}>
            <Wheel size="225" fontSize="2.7em" text={"Portfolio"} />
          </Box>
        )}
      </SlideAnimation>

      {!isMobile && (
        <Center position={"absolute"} w={"100%"} h="100%">
          <SlideAnimation visible={true} axis="y" from={100} to={0} speed={25}>
            <Wheel size={wheelSize} fontSize="2.35em" text={"Portfolio"} />
          </SlideAnimation>
        </Center>
      )}

      <SlideAnimation visible={true} axis="x" from={100} to={0}>
        <Pressable
          position={"absolute"}
          bottom={isMobile ? "-30px" : "0"}
          right={"0%"}
          alignItems={"center"}
          flexDir={"row"}
          justifyContent="center"
          borderWidth={1}
          borderColor={"rgba(160,160,160,1)"}
          w="40%"
          p="2"
          onPress={handleDownload}
          _hover={{ bg: "muted.200" }}
          _pressed={{ bg: "muted.300" }}
        >
          <DownloadIcon size={"1.7em"} />
          <Text fontFamily={"Light"} ml="4%" fontSize={"1.4em"}>
            Download Resume
          </Text>
        </Pressable>
      </SlideAnimation>
    </View>
  );
};

export default HomeScreen;

const Bio = () => {
  const biosize = useBreakpointValue({
    base: "0.98em",
    sm: "1.1em",
    md: "1.4em",
    lg: "1.8em",
    xl: "1.2em",
    xxl: "2em",
  });

  return (
    <>
      <Text variant={"titleTextHeader"}>A bit about me.</Text>
      <Text
        mt="6%"
        variant={"titleTextContent"}
        fontSize={
          window.innerWidth <= 1536 && window.innerWidth > 1025
            ? "1em"
            : biosize
        }
        textAlign={window.innerWidth < 500 ? "center" : "left"}
      >
        As a passionate Full Stack Engineer with a strong commitment to the
        craft, I have always been an ardent advocate of simplicity and
        efficiency in my work. I view technology as a force multiplier for
        functional creativity and I strive to incorporate these values into each
        line of code I write.
      </Text>
    </>
  );
};

const MyImage = () => {
  return (
    <Image
      borderRadius={"10px"}
      w={"100%"}
      h="100%"
      resizeMode="contain"
      source={require("../assets/images/me.jpg")}
    />
  );
};
