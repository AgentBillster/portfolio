import {
  PresenceTransition,
  Pressable,
  Center,
  VStack,
  HStack,
  Text,
  Button,
} from "native-base";
import React from "react";

export const ChoiceModal = ({
  showModal,
  body,
  confirm,
  deny,
  onConfirm,
  onDeny,
}) => {
  return (
    <>
      <PresenceTransition
        visible={showModal}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.5,
          transition: {
            type: "timing",
            duration: 200,
          },
        }}
        exit={{
          opacity: 0,
        }}
        style={{
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          zIndex: 2,
          position: "fixed",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(0,0,0)",
        }}
      />

      {showModal && (
        <Pressable
          onPress={onDeny}
          position={"absolute"}
          m={"auto"}
          w="100%"
          h="100%"
          alignItems={"center"}
          justifyContent={"center"}
          zIndex={5}
        >
          <PresenceTransition
            visible={showModal}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            style={{
              width: "80%",
              height: "20%",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0px 0px 2px 2px rgba(100,100,100,1)",
            }}
          >
            <VStack flex={1}>
              <Center
                flex={0.6}
                borderBottomWidth={1}
                borderBottomColor={"muted.400"}
                p="2"
              >
                <Text
                  textAlign={"center"}
                  _dark={{
                    color: "black",
                  }}
                >
                  {body}
                </Text>
              </Center>
              <HStack flex={0.4}>
                <Button
                  onPress={onDeny}
                  flex={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                  bg={"none"}
                  borderRadius={0}
                  borderBottomLeftRadius={"12px"}
                  borderRightWidth={1}
                  borderRightColor={"muted.400"}
                  _hover={{
                    bg: "muted.200",
                  }}
                  _pressed={{
                    bg: "muted.200",
                  }}
                >
                  <Text
                    _dark={{
                      color: "black",
                    }}
                  >
                    {deny}
                  </Text>
                </Button>
                <Button
                  onPress={onConfirm}
                  flex={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                  bg={"none"}
                  borderRadius={0}
                  borderBottomRightRadius={"12px"}
                  _hover={{
                    bg: "muted.200",
                  }}
                  _pressed={{
                    bg: "muted.200",
                  }}
                >
                  <Text
                    _dark={{
                      color: "black",
                    }}
                  >
                    {confirm}
                  </Text>
                </Button>
              </HStack>
            </VStack>
          </PresenceTransition>
        </Pressable>
      )}
    </>
  );
};
