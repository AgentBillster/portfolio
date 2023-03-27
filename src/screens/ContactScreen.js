import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {animated } from "@react-spring/web";
import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  PresenceTransition,
  Text,
  TextArea,
  VStack,
} from "native-base";

const ContactScreen = ({ style }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    if (!name || !email || !message || !subject) {
      setError("please fill all fields");
    } else {
      emailjs
        .send(
          "service_3ytj8ka",
          "template_ep9tyvs",
          {
            email,
            message,
            subject,
            name,
          },
          "BCv5CU_yLJa_4JHT2"
        )
        .then(
          (result) => {
            // setGood(true);
          },
          (error) => {
            console.log(error.text);
          }
        );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  };

  return (
    <animated.div
      style={{
        ...style,
        width: "100%",
        paddingBlock: "8%",
        paddingInline: "10%",
      }}
    >
      <Center>
        <VStack>
          <Text variant="bigtext">Get in Touch</Text>
          <Text variant="bigsubtext">message me anytime</Text>
        </VStack>

        <VStack w={"50%"} alignSelf="center" mt="10" space="2">
          <PresenceTransition
            visible={error ? true : false}
            initial={{
              translateX: 10,
              opacity: 0,
            }}
            animate={{
              translateX: 0,
              opacity: 1,

              transition: {
                duration: 250,
                type: "spring",
                useNativeDriver: false,
              },
            }}
          >
            <Box
              _text={{
                color: "red",
              }}
            >
              please fill all fields
            </Box>
          </PresenceTransition>
          <HStack space="2">
            <Input
              borderColor={"black"}
              p={"4"}
              value={name}
              w="49%"
              onChangeText={(text) => setName(text)}
              placeholder="Name"
            />

            <Input
              borderColor={"black"}
              p={"4"}
              value={email}
              w="50%"
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
            />
          </HStack>

          <Input
            borderColor={"black"}
            p={"4"}
            value={subject}
            w="100%"
            onChangeText={(text) => setSubject(text)}
            placeholder="subject "
          />
          <TextArea
            _dark={{
              borderColor: "white",
            }}
            borderColor={"black"}
            h="100px"
            p={"4"}
            value={message}
            w="100%"
            onChangeText={(text) => setMessage(text)}
            placeholder="Message"
          />
          <Button
            p="4"
            colorScheme={"black"}
            variant="outline"
            borderColor={"muted.400"}
            onPress={(e) => {
              sendEmail(e);
            }}
          >
            send
          </Button>
        </VStack>
      </Center>
    </animated.div>
  );
};

export default ContactScreen;

