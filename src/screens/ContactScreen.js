import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Alert,
  Button,
  Center,
  CheckCircleIcon,
  Divider,
  HStack,
  Image,
  Input,
  Text,
  useColorMode,
  useMediaQuery,
  useToast,
  View,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { breakpoints } from "../theme";
import { CenterIcon, MailIcon, UserIcon } from "../assets/icons/icons";
import { SlideAnimation } from "../components/SlideAnimation";
import { PostOverlay } from "../Projects/components(native)/PostOverlay";

const ContactScreen = ({ style }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { colorMode } = useColorMode();
  const toast = useToast();

  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });

  const sendEmail = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.show({
        render: () => {
          return (
            <Alert p="2" colorScheme={"danger"} variant={"top-accent"}>
              <HStack alignSelf={"start"} space={2}>
                <WarningOutlineIcon />
                <Text>Error</Text>
              </HStack>
              <Text>Please fill out all fields</Text>
            </Alert>
          );
        },
      });
    } else {
      setName("");
      setEmail("");
      setMessage("");
      toast.show({
        render: () => {
          return (
            <Alert p="2" colorScheme={"success"} variant={"left-accent"}>
              <HStack alignSelf={"start"} space={2}>
                <CheckCircleIcon />
                <Text>Success</Text>
              </HStack>
              <Text>Message Sent!</Text>
            </Alert>
          );
        },
      });
      emailjs
        .send(
          "service_3ytj8ka",
          "template_ep9tyvs",
          {
            email,
            message,
            name,
          },
          "BCv5CU_yLJa_4JHT2"
        )
        .then((result) =>
          toast.show({
            render: () => {
              return (
                <Alert p="2" colorScheme={"success"} variant={"left-accent"}>
                  <HStack alignSelf={"start"} space={2}>
                    <CheckCircleIcon />
                    <Text>Success</Text>
                  </HStack>
                  <Text>Message Sent!</Text>
                </Alert>
              );
            },
          })
        );
    }
  };

  const size = isMobile ? "60vh" : "31vw";

  return (
    <View h={"100%"} w={"100%"} flexDir={"row"}>
      <View flex={1}>
        <View mt="5" w="70%" alignSelf={"center"}>
          <Text textAlign={"center"} variant="bigtext">
            What are you waiting for?
          </Text>
          <Text
            textAlign={"center"}
            variant="bigsubtext"
            _light={{
              color: "muted.400",
            }}
            _dark={{
              color: "muted.600",
            }}
          >
            Lets team up and make something awesome.
          </Text>
        </View>

        <Center flex="1">
          <View
            style={{
              position: "absolute",
              width: size,
              height: size,
              alignItems: "center",
              borderRadius: "50%",
            }}
          >
            <Text mt="14%" variant="message">
              Send me a Message
            </Text>
            <VStack mt="6%" space={"10%"} w="68%">
              <View
                style={{
                  border: "1px solid black",
                  borderRadius: "5px",
                  fontSize: "15px",
                  boxShadow: "0px 3px 0px 0px black",
                  backgroundColor: "white",
                }}
              >
                <Input
                  InputLeftElement={<UserIcon />}
                  my={"2%"}
                  mx={"5%"}
                  placeholderTextColor={"black"}
                  placeholder={"Enter your name"}
                  variant={"unstyled"}
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </View>
              <View
                style={{
                  border: "1px solid black",
                  borderRadius: "5px",
                  fontSize: "15px",
                  boxShadow: "0px 3px 0px 0px black",
                  backgroundColor: "white",
                }}
              >
                <Input
                  InputLeftElement={<MailIcon />}
                  my={"2%"}
                  mx={"5%"}
                  placeholderTextColor={"black"}
                  placeholder={"Enter your email"}
                  variant={"unstyled"}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>

              <View
                style={{
                  border: "1px solid black",
                  borderRadius: "5px",
                  fontSize: "15px",
                  boxShadow: "0px 3px 0px 0px black",
                  backgroundColor: "white",
                }}
              >
                <Input
                  InputLeftElement={<CenterIcon />}
                  my={"2%"}
                  mx={"5%"}
                  placeholderTextColor={"black"}
                  placeholder={"Enter your message"}
                  variant={"unstyled"}
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />
              </View>
            </VStack>

            <Button
              mt="10%"
              w="68%"
              borderWidth={1}
              bg={"rgb(218,204,243)"}
              variant={"unstyled"}
              onPress={(e) => {
                sendEmail(e);
              }}
              style={{
                boxShadow: "0px 3px 0px 0px black",
              }}
              _text={{
                _dark: {
                  color: "black",
                },
              }}
            >
              Submit
            </Button>
          </View>

          <View
            style={{
              alignSelf: "center",
              position: "absolute",
              width: size,
              height: size,
              zIndex: -2,
              opacity: 0.3,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundImage:
                "linear-gradient(to right bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec)",
            }}
          >
            <View
              position={"absolute"}
              w="100%"
              h="80%"
              bottom={0}
              borderBottomRadius={"50%"}
              zIndex={2}
              style={{
                background: `linear-gradient(to bottom, transparent, ${
                  colorMode === "dark" ? "rgb(28, 28, 28)" : "#ffffff"
                })`,
              }}
            />
          </View>
        </Center>
      </View>

      <SlideAnimation
        style={{
          flex: 0.7,
          display: isMobile ? "none" : undefined,
          backgroundColor: "white",
          padding: "2%",
          borderRadius: "10px",
          boxShadow: `0px 0px 7px 0px ${
            colorMode === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)"
          }`,
        }}
        visible={true}
        axis="x"
        from={15}
        to={0}
        speed={40}
      >
        <Image
          style={{
            boxShadow: "0px 0px 08px 0px rgba(0,0,0,0.35)",
          }}
          height="100%"
          w="100%"
          display={["none", "none", "", "", "", ""]}
          borderRadius={"20px"}
          borderColor="#F2F3F2"
          source={require("../assets/images/pic.jpg")}
          alt="Alternate Text"
        />
        <HStack
          position={"absolute"}
          bottom={"3%"}
          py={"4%"}
          left="8%"
          w="40%"
          justifyContent={"space-evenly"}
        >
          <Text
            variant={"textlink"}
            onPress={() =>
              window.open("https://github.com/AgentBillster", "_blank")
            }
          >
            Github
          </Text>
          <Text
            variant={"textlink"}
            onPress={() =>
              window.open(
                "https://www.linkedin.com/in/agentbillster/",
                "_blank"
              )
            }
          >
            Linkedin
          </Text>
          <Text
            variant={"textlink"}
            onPress={() =>
              window.open("https://www.instagram.com/willwil95/", "_blank")
            }
          >
            Instagram
          </Text>
        </HStack>
      </SlideAnimation>

      <SlideAnimation
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          zIndex: -1,
        }}
        visible={true}
        axis="x"
        from={40}
        to={0}
        speed={25}
      >
        {[...Array(Math.floor(window.innerWidth / 100))].map((_, i) => (
          <Divider
            key={i}
            orientation="vertical"
            h="100%"
            opacity={0.8}
            _dark={{
              bg: "muted.700",
            }}
          />
        ))}
      </SlideAnimation>
    </View>
  );
};

export default ContactScreen;
