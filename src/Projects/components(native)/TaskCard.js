import React from "react";
import {
  ArrowForwardIcon,
  Box,
  Button,
  Center,
  Checkbox,
  HStack,
  Popover,
  Pressable,
  Progress,
  Text,
  ThreeDotsIcon,
  View,
  useMediaQuery,
} from "native-base";
import { DateIcon, IntervalIcon, TimeIcon } from "../Pomodoro/assets/Icons";
import { breakpoints } from "../../theme";

export const TaskCard = ({
  handleTaskPress,
  handleTaskArchive,
  removeFromDeletion,
  addToDeletion,
  section,
  item,
}) => {
  const { resumeFromInterval = 0, completed } = item.touched || {};
  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });

  const getTimeString = (timestamp) => {
    const timeDiff = new Date().getTime() - timestamp;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (hours < 24) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (days < 7) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else {
      const date = new Date(timestamp);
      const day = date
        .toLocaleString("en-us", { weekday: "short" })
        .toUpperCase();
      const month = date
        .toLocaleString("en-us", { month: "short" })
        .toUpperCase();
      const dateStr = date.toLocaleString("en-us", { day: "numeric" });
      return `${day}, ${dateStr} ${month}`;
    }
  };

  const renderText = () => {
    if (item.touched) {
      return (
        <>
          <Text italic fontSize={"14px"}>
            POMODORO
          </Text>
          <Text
            fontSize={"12px"}
            italic
          >{`${resumeFromInterval} of ${item.intervals}`}</Text>
        </>
      );
    } else {
      return (
        <Text fontSize={"15px"} italic>
          START TASK TO TRACK
        </Text>
      );
    }
  };

  return (
    <>
      <Pressable
        onPress={() => {
          if (section === "Archived") {
            return null;
          } else {
            handleTaskPress(item);
          }
        }}
        key={item.task}
        h={isMobile ? "16vh" : "8.5vw"}
        bg="white"
        borderRadius={"5px"}
        flexDir="row"
        m="1%"
      >
        <View flex="0.4">
          {["muted.400", "muted.600", "black"].map((item, i) => (
            <Center
              key={i}
              w="75%"
              h="60%"
              bg={item}
              borderRadius={"5px"}
              position="absolute"
              left={`${8 + i * 8}%`}
              top={`${8 + i * 8}%`}
              p="6.5%"
              style={{
                boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
              }}
            >
              {i === 2 && renderText()}
            </Center>
          ))}
        </View>
        <View flex="0.6" p="2%">
          <HStack h="30%" alignItems={"center"}>
            <DateIcon size={"1.2em"} />
            <Text fontSize={"0.8em"} ml="3%" _dark={{ color: "black" }}>
              {getTimeString(item.timestamp)}
            </Text>

            {section === "Archived" ? (
              <Box ml="auto">
                <Checkbox
                  colorScheme="danger"
                  onChange={(state) => {
                    if (state) {
                      addToDeletion(item.task);
                    } else {
                      removeFromDeletion(item.task);
                    }
                  }}
                />
              </Box>
            ) : (
              <Box ml="auto">
                <Popover
                  w="100%"
                  h="100%"
                  trigger={(triggerProps) => {
                    return (
                      <Pressable
                        alignItems={"center"}
                        justifyContent={"center"}
                        size={"2em"}
                        {...triggerProps}
                      >
                        <ThreeDotsIcon _dark={{ color: "black" }} />
                      </Pressable>
                    );
                  }}
                >
                  <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                    <Popover.Arrow />
                    <Popover.CloseButton />
                    <Popover.Body>Archive this task?</Popover.Body>
                    <Popover.Footer justifyContent="flex-end">
                      <Button.Group space={2}>
                        <Button colorScheme="coolGray" variant="ghost">
                          Cancel
                        </Button>
                        <Button
                          onPress={() => handleTaskArchive(item.task)}
                          colorScheme="danger"
                        >
                          archive
                        </Button>
                      </Button.Group>
                    </Popover.Footer>
                  </Popover.Content>
                </Popover>
              </Box>
            )}
          </HStack>

          <View px="1%" h="30%" justifyContent={"end"}>
            <Text
              _dark={{ color: "black" }}
              variant={"tasktext"}
              fontSize={"1.4em"}
              fontFamily={"Light"}
              isTruncated
              strikeThrough={completed}
            >
              {item.task}
            </Text>
          </View>

          <HStack w="100%" space="1%" alignItems={"center"}>
            {completed ? (
              <Text _dark={{ color: "black" }} fontSize={"1.3em"}>
                completed
              </Text>
            ) : (
              <>
                <TimeIcon fill={"black"} size={"1.4em"} />
                <Text _dark={{ color: "black" }} fontSize={"1.1em"} mr="5%">
                  5
                </Text>
                <IntervalIcon fill={"black"} size={"1.5em"} />
                <Text _dark={{ color: "black" }} fontSize={"1.1em"}>
                  4
                </Text>
                <ArrowForwardIcon
                  p="0.4em"
                  ml="auto"
                  _dark={{ color: "black" }}
                  size="1.2em"
                />
              </>
            )}
          </HStack>
        </View>

        <Center
          position={"absolute"}
          bottom={"4%"}
          w="100%"
          h="5px"
          // bg="rgba(200,200,200, 0.8)"
          borderRadius={"30px"}
        >
          <Progress
            w="98%"
            h="100%"
            value={resumeFromInterval + 0.1}
            min={0}
            max={item.intervals}
            borderRadius={"3px"}
            bg="muted.300"
            _filledTrack={{
              bg: "black",
              borderRadius: "3px",
            }}
          />
        </Center>
      </Pressable>
    </>
  );
};
