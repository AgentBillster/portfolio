import React, { useEffect, useState } from "react";
// import { NBaseTabs } from "../components/NBaseTabs";
import {
  AddIcon,
  Button,
  DeleteIcon,
  HStack,
  IconButton,
  Popover,
  PresenceTransition,
  ScrollView,
  Text,
  VStack,
  useMediaQuery,
} from "native-base";
import { breakpoints } from "../../theme";
import { TaskCard } from "../components(native)/TaskCard";

export const TaskList = ({
  handleTaskPress,
  data,
  setShowForm,
  handleTaskArchive,
  handleTaskDeletion,
}) => {
  const [tasksToDelete, setTasksToDelete] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });

  const addToDeletion = (taskName) => {
    if (!tasksToDelete.includes(taskName)) {
      setTasksToDelete([...tasksToDelete, taskName]);
    }
  };

  const removeFromDeletion = (taskName) => {
    setTasksToDelete(tasksToDelete.filter((task) => task !== taskName));
  };

  return (
    <>
      <PresenceTransition
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "15%",
          zIndex: "5",
        }}
        visible={tasksToDelete.length > 0}
        initial={{
          translateY: -45,
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: {
            type: "spring",
            damping: 30,
          },
        }}
        exit={{
          opacity: 0,
          translateY: -45,
        }}
      >
        <Popover
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          trigger={(triggerProps) => {
            return (
              <IconButton
                borderRadius="50%"
                w={isMobile ? "8vh" : "3.6vw"}
                h={isMobile ? "8vh" : "3.6vw"}
                {...triggerProps}
                icon={<DeleteIcon _dark={{ color: "red.400" }} size="70%" />}
                style={{
                  boxShadow: "0px 0px 16px 0px rgba(0,0,0,0.55)",
                }}
                bg="rgb(240,240,240)"
                _hover={{
                  bg: "rgb(230,230,230)",
                }}
              />
            );
          }}
        >
          <Popover.Content
            backgroundColor={"white"}
            accessibilityLabel="Delete Customerd"
            w="56"
          >
            <Popover.Arrow
              bg={"red.500"}
              borderColor={"black"}
              borderWidth={4}
            />
            <Popover.CloseButton />
            <Popover.Body>
              <Text>this action will delete: </Text>
              {tasksToDelete.map((item) => (
                <Text>{item}</Text>
              ))}
            </Popover.Body>
            <Popover.Footer justifyContent="flex-end">
              <Button.Group space={2}>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    handleTaskDeletion(tasksToDelete);
                    setTasksToDelete([]);
                    setIsOpen(false);
                  }}
                >{`delete task`}</Button>
                <Button colorScheme="coolGray" variant="ghost">
                  Cancel
                </Button>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover>
      </PresenceTransition>

      <ScrollView flex={1} pb="25%">
        <PresenceTransition
          visible={true}
          initial={{
            translateX: -45,
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            translateX: 0,
            transition: {
              type: "spring",
              damping: 30,
            },
          }}
        >
          {data.map((section) => (
            <React.Fragment key={section.title}>
              {section.title === "Todo" ? (
                <HStack borderWidth={1} justifyContent={"space-between"} p="4%">
                  <Text
                    w="72%"
                    fontSize={"3em"}
                    lineHeight={"1.2em"}
                    fontFamily={"Light"}
                  >
                    What will you work on Today?
                  </Text>
                  <VStack space={"1em"}>
                    <IconButton
                      bg="white"
                      borderRadius="50%"
                      w={isMobile ? "8vh" : "3.2vw"}
                      h={isMobile ? "8vh" : "3.2vw"}
                      borderColor={"rgb(127,64,64)"}
                      mt="auto"
                      onPress={() => setShowForm(true)}
                      icon={<AddIcon _dark={{ color: "black" }} size="50%" />}
                    />
                  </VStack>
                </HStack>
              ) : (
                <Text
                  textAlign={"baseline"}
                  fontSize="xl"
                  px="3.2%"
                  mt="1.5rem"
                >
                  {section.title}
                </Text>
              )}

              {section.data.map((item, i) => (
                <TaskCard
                  item={item}
                  section={section.title}
                  handleTaskPress={handleTaskPress}
                  handleTaskArchive={handleTaskArchive}
                  addToDeletion={addToDeletion}
                  removeFromDeletion={removeFromDeletion}
                />
              ))}
            </React.Fragment>
          ))}
        </PresenceTransition>
      </ScrollView>
    </>
  );
};
