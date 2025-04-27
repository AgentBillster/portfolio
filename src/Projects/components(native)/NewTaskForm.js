import {
  Button,
  CheckIcon,
  CloseIcon,
  HStack,
  IconButton,
  Menu,
  PresenceTransition,
  Select,
  Switch,
  Text,
  TextArea,
  View,
  useBreakpointValue,
} from "native-base";
import { useState } from "react";
import { VibrateIcon } from "../Pomodoro/assets/Icons";
import { TimeIcon } from "../Pomodoro/assets/Icons";
import { IntervalIcon } from "../Pomodoro/assets/Icons";

export const NewTaskForm = ({ showForm, close, handleTaskAdd }) => {
  const [task, setTask] = useState("");
  const [vibrate, setVibrate] = useState(true);
  const [interlude, setInterlude] = useState(5);
  const [intervals, setIntervals] = useState(3);
  const [error, setError] = useState();

  const textAreaFontSize = useBreakpointValue({
    base: "20px",
    sm: "20px",
    md: "30px",
    lg: "36px",
    xl: "23px",
    xxl: "30px",
  });

  return (
    <PresenceTransition
      visible={showForm}
      initial={{
        translateY: "100%",
        opacity: 0,
      }}
      animate={{
        translateY: "0%",
        opacity: 1,
        transition: {
          type: "spring",
          mass: 0.3,
          damping: 24,
          // stiffness: 90,
          overshootClamping: true,
        },
      }}
      exit={{
        opacity: 0,
        translateY: "100%",
        transition: {
          type: "spring",
          mass: 0.5,
          damping: 40,
          overshootClamping: true,
        },
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        zIndex: 10,
        backgroundColor: "rgb(27,28,33)",
      }}
    >
      <View flex={1}>
        <HStack>
          <IconButton
            onPress={() => {
              close();
            }}
            icon={<CloseIcon size="10px" />}
          />
        </HStack>
        <TextArea
          fontSize={textAreaFontSize}
          m={"3%"}
          bg="none"
          placeholderTextColor={"gray.700"}
          placeholder={"Add pomodoro task"}
          variant={"unstyled"}
          value={task}
          onChangeText={(text) => setTask(text)}
          borderBottomColor={"gray.700"}
          borderBottomWidth={1}
          borderRadius={0}
        />

        <HStack alignItems={"center"} p="4%">
          <View flex="0.1">
            <VibrateIcon />
          </View>

          <Text ml="3%" flex={0.9} variant="" fontSize={"18px"}>
            Vibrate
          </Text>
          <Switch
            ml={"auto"}
            defaultIsChecked={true}
            isChecked={vibrate}
            onToggle={() => setVibrate(!vibrate)}
          />
        </HStack>
        <HStack alignItems={"center"} p="4%">
          <View flex="0.1">
            <TimeIcon size={"100%"} />
          </View>

          <Text ml="3%" flex={0.9} variant="" fontSize={"18px"}>
            Break duration
          </Text>
          <Menu
            trigger={(triggerProps) => {
              return (
                <Text ml={"auto"} {...triggerProps}>
                  {interlude}
                </Text>
              );
            }}
          >
            {[5, 10, 15, 20, 25].map((value) => (
              <Menu.Item key={value} onPress={() => setInterlude(value)}>
                {`${value} mins`}
              </Menu.Item>
            ))}
          </Menu>
        </HStack>
        <HStack alignItems={"center"} p="4%">
          <View flex="0.1">
            <IntervalIcon size="100%" />
          </View>

          <Text ml="3%" flex={0.9} variant="" fontSize={"18px"}>
            Pomodoro
          </Text>
          <Menu
            trigger={(triggerProps) => {
              return (
                <Text ml={"auto"} {...triggerProps}>
                  {intervals}
                </Text>
              );
            }}
          >
            {[2, 3, 4, 5, 6, 7].map((value) => (
              <Menu.Item key={value} onPress={() => setIntervals(value)}>
                {`${value} pomodoro`}
              </Menu.Item>
            ))}
          </Menu>
        </HStack>

        {error && (
          <View mt="auto" alignItems={"center"}>
            <Text
              style={{
                color: "red",
              }}
              fontSize={"20"}
            >
              {error}
            </Text>
          </View>
        )}

        <Button
          onPress={() => {
            const obj = {
              task,
              vibrate,
              interlude,
              intervals,
              timestamp: new Date().getTime(),
            };
            handleTaskAdd(obj, setError);
          }}
          m="4%"
          mt="auto"
        >
          Add
        </Button>
      </View>
    </PresenceTransition>
  );
};
