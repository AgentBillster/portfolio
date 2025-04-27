import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  Button,
  Center,
  IconButton,
  View,
  HStack,
  PresenceTransition,
  useBreakpointValue,
  useMediaQuery,
} from "native-base";
import { BackIcon, PauseIcon, PlayIcon, SkipIcon } from "../../assets/Icons";
import { Vibration } from "react-native";
import { breakpoints } from "../../../../theme";
import { HeaderBar } from "../../../components(native)/HeaderBar";
import { ChoiceModal } from "../../../components(native)/ChoiceModal";
import { AlertOverlay } from "../../../components(native)/AlertOverlay";
import { PostOverlay } from "../../../components(native)/PostOverlay";

export const TimerScreen = ({ propData, navigate }) => {
  const { resumeFromInterval = 0 } = propData.task.touched || {};
  const [intervalCount, setIntervalCount] = useState(resumeFromInterval);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const minutes = Math.floor(secondsRemaining / 60);
  const totalSecondsRef = useRef(0);

  const [isPaused, setIsPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });
  const headericonSize = useBreakpointValue({
    base: "32px",
    sm: "36px",
    md: "42px",
    lg: "48px",
    xl: "32px",
    xxl: "38px",
  });

  const controliconsize = useBreakpointValue({
    base: "45px",
    sm: "48px",
    md: "65px",
    lg: "70px",
    xl: "35px",
    xxl: "45px",
  });

  /* 
  timer should run as long as not paused and seconds > 0
  upon timer ending handle these cases:
  we are not on a break
    - set isBreak to true and add 5 mins to timer 
    - check if intervalCount is target. if so, complete task
  we are on a break
    - set isBreak to false, add 25 mins to timer and increment intervalCount
*/
  const handlePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const handleSkip = () => {
    if (isBreak) {
      setSecondsRemaining(0);
    } else {
      totalSecondsRef.current += secondsRemaining;
      setSecondsRemaining(0);
    }
  };

  useEffect(() => {
    if (isDone) {
      const completed =
        totalSecondsRef.current === 25 * 60 * propData.task.intervals
          ? true
          : false;
      const timeData = {
        completed,
        total: totalSecondsRef.current,
        resumeFromInterval: intervalCount,
      };
      propData.saveTimeData(timeData, propData.task.task);
    }
    let interval = null;
    if (!isPaused && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((seconds) => {
          if (!isBreak) {
            totalSecondsRef.current += 1;
          }
          return seconds - 1;
        });
      }, 1000);
    } else if (secondsRemaining === 0 && !isBreak) {
      if (intervalCount + 1 === propData.task.intervals) {
        clearInterval(interval);
        setIsDone(true);
      } else {
        Vibration.vibrate([1500], false);
        setSecondsRemaining(5 * 60);
        setIntervalCount((intervalCount) => intervalCount + 1);
        setIsBreak(true);
      }
    } else if (secondsRemaining === 0 && isBreak) {
      Vibration.vibrate([20, 20, 50], false);
      setSecondsRemaining(25 * 60); // set 25-minute interval
      setIsBreak(false);
    }
    return () => clearInterval(interval);
  }, [isPaused, secondsRemaining, isBreak, isDone]);

  const formatSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes.toString();
    const formattedSeconds =
      remainingSeconds < 10
        ? `0${remainingSeconds}`
        : remainingSeconds.toString();

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleBackPress = () => {
    if (intervalCount > 0 || secondsRemaining < 25 * 60) {
      setIsPaused(true);
      setShowModal(true);
    } else {
      navigate("Tasks");
    }
  };

  const handleHeaderTitle = () => {
    switch (true) {
      case isDone:
        return "done";

      case secondsRemaining < 25 * 60 && isPaused:
        return "Paused";

      case isBreak:
        return "Break";

      case secondsRemaining <= 25 * 60 && !isBreak && !isPaused:
        return "Focus";

      default:
        return "Timer";
    }
  };

  const PlayPauseButton = (
    <IconButton
      onPress={handlePlayPause}
      icon={
        isPaused ? (
          <PlayIcon size={controliconsize} />
        ) : (
          <PauseIcon size={controliconsize} />
        )
      }
    />
  );
  const skipButton = (
    <IconButton
      onPress={() => handleSkip()}
      icon={<SkipIcon size={controliconsize} />}
    />
  );

  const modalProps = {
    body: "Are you sure you want to end session? Data will be saved.",
    confirm: "Save and exit",
    deny: "I think i'll stay",
    showModal,
    setShowModal,
    onDeny: () => {
      setIsPaused(false);
      setShowModal(false);
    },
    onConfirm: () => {
      setIsDone(true);
      setShowModal(false);
    },
  };

  // const secondsElapsed
  const EndPromptProps = {
    isDone,
    color: "green.600",
    total: totalSecondsRef.current,
  };

  const overlayProps = {
    visible: isDone,
    fadeDuration: 400,
    fadeOpacity: 0.9,
  };

  return (
    <View w="100%" h="100%">
      <PresenceTransition
        visible={true}
        initial={{
          translateX: 30,
          opacity: 0,
        }}
        animate={{
          translateY: 0,
          opacity: 1,
          transition: {
            type: "spring",
            damping: 150,
          },
        }}
        exit={{
          translateX: 100,
          opacity: 0,
        }}
        style={{
          flex: 1,
        }}
      >
        <HeaderBar
          title={<Text variant={"headerbartitle"}>{handleHeaderTitle()}</Text>}
          color={"rgb(7,7,7)"}
          leftButton={
            <IconButton
              onPress={handleBackPress}
              icon={<BackIcon size={headericonSize} />}
            />
          }
        />
        <Center flex={0.15}>
          <Text variant="timerscreenheader">CURRENT TASK</Text>
          <Text variant="timerscreentask">{propData.task.task}</Text>
        </Center>

        <View flex={0.6} alignItems={"center"} justifyContent={"center"}>
          <Center
            size={isMobile ? "40vh" : "16vw"}
            borderRadius={"50%"}
            borderWidth={1}
            borderColor="white"
          >
            <Text variant={"timerscreentime"}>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {secondsRemaining % 60 < 10
                ? `0${secondsRemaining % 60}`
                : secondsRemaining % 60}
            </Text>
            <Text variant={"timerscreensub"}>{`Pomodoro ${
              intervalCount + 1
            } of ${propData.task.intervals}`}</Text>
          </Center>

          <SessionIndicator
            current={intervalCount}
            total={propData.task.intervals}
            isPaused={isPaused}
            isBreak={isBreak}
          />
        </View>

        <Center flex={0.25}>
          <TimerControls
            leftIcon={PlayPauseButton}
            leftAction={isPaused ? "Start" : "Pause"}
            rightIcon={skipButton}
            rightAction={"Skip"}
          />
        </Center>
      </PresenceTransition>
      <ChoiceModal {...modalProps} />
      <AlertOverlay {...overlayProps}>
        <PostOverlay {...EndPromptProps}>
          <Text textAlign={"center"} fontSize={"18px"}>
            {formatSeconds(totalSecondsRef.current)} mins of productive time
            this session!
          </Text>
          <Text textAlign={"center"} fontSize={"1.5em"}>
            👏🏾
          </Text>
          <Button onPress={() => navigate("Tasks")} w="50%" variant={"outline"}>
            go back
          </Button>
        </PostOverlay>
      </AlertOverlay>
    </View>
  );
};

const TimerControls = ({ leftIcon, leftAction, rightIcon, rightAction }) => {
  return (
    <HStack space={"40px"} mt="20px">
      <Center>
        {leftIcon}
        {leftAction}
      </Center>
      <Center>
        {rightIcon}
        {rightAction}
      </Center>
    </HStack>
  );
};

const SessionIndicator = ({ current, total, isPaused, isBreak }) => {
  const circleSize = useBreakpointValue({
    base: "20px",
    sm: "22px",
    md: "32px",
    lg: "36px",
    xl: "24px",
    xxl: "28px",
  });

  // if not paused, switches between true and false every second
  const [repeat, setRepeat] = useState(true);
  useEffect(() => {
    let intervalId;
    if (!isPaused) {
      intervalId = setInterval(() => {
        setRepeat((prev) => !prev);
      }, 600);
    }
    return () => clearInterval(intervalId);
  }, [isPaused]);

  /* 
    - am i the current index?
    - are we paused?
        - color is red
      - are we on a break?
       - color is blue
    - am i less than the current index?
      - color is green
    - am i greater than the current index?
      - i am transparent
  */

  const backgroundColor = (index) => {
    switch (true) {
      case index === current && isPaused:
        return "#f3172D";
      case index === current && isBreak:
        return "#0096FF";
      case index === current && !isPaused && !isBreak:
        return "#7FFF00";
      case index < current:
        return "white";
      case current === 0 && index === 0:
        return "white";
      default:
        return "none";
    }
  };

  return (
    <HStack mt="8%">
      {[...Array(total).keys()].map((index) => (
        <View
          key={index}
          style={{
            width: circleSize,
            height: circleSize,
            borderRadius: "50%",
            borderWidth: "1px",
            borderColor: "darkgrey",
            margin: "4px",
            overflow: "hidden",
            backgroundColor: isPaused && backgroundColor(index),
          }}
        >
          <PresenceTransition
            // give repeat state if we are the current index.
            visible={current === index ? repeat : true}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 1000,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 1000,
              },
            }}
            style={{
              backgroundColor: backgroundColor(index),
              width: circleSize,
              height: circleSize,
            }}
          />
        </View>
      ))}
    </HStack>
  );
};
