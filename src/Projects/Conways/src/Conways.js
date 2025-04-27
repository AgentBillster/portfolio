import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Button,
  Center,
  PresenceTransition,
  Text,
  VStack,
  View,
  useBreakpointValue,
  useMediaQuery,
} from "native-base";
import { LandscapeIcon } from "../../Pomodoro/assets/Icons";
import { breakpoints } from "../../../theme";
import { ChoiceModal } from "../../components(native)/ChoiceModal";
import useMeasure from "react-use-measure";
import { AlertOverlay } from "../../components(native)/AlertOverlay";
import { PostOverlay } from "../../components(native)/PostOverlay";
import Lottie from "lottie-react";
import cube from "../../../assets/lottie/cube.json";
import conways from "../../../assets/lottie/conways.json";
import { SplashScreen } from "../../components(native)/SplashScreen";
import { useTransition, animated } from "@react-spring/web";

export const Conways = ({ closeApp, viewCode }) => {
  const [ref, { width, height }] = useMeasure();
  const GridProps = { width, height };

  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSim, setShowSim] = useState(false);

  const overlayProps = {
    visible: showAlert,
    onBodyPress: () => setShowAlert(false),
    fadeOpacity: 0.7,
  };

  const modalProps = {
    body: "Exit Sim?",
    confirm: "Exit",
    deny: "Not Yet",
    showModal,
    onConfirm: () => {
      closeApp();
      setShowModal(false);
    },
    onDeny: () => setShowModal(false),
  };

  const handlePress = () => {
    if (isMobile) {
      setShowAlert(true);
    } else {
      viewCode();
    }
  };

  return (
    <View ref={ref} bg="rgb(7,7,7)" w={"100%"} h={isMobile ? "100%" : "92%"}>
      <SplashScreen anim={conways} app={"Conways Game of Life"} />
      <AlertOverlay {...overlayProps}>
        <Text>Put device in landscape mode to continue</Text>
        <LandscapeIcon size="40px" />
      </AlertOverlay>
      <ChoiceModal {...modalProps} />
      {showSim ? (
        <Grid setShowSim={setShowSim} {...GridProps} />
      ) : (
        <PresenceTransition
          visible={true}
          style={{
            flex: 1,
          }}
          initial={{
            opacity: 0,
            scaleY: 0,
          }}
          animate={{
            opacity: 1,
            scaleY: 1,
          }}
          exit={{
            opacity: 0,
            scaleY: 0,
          }}
        >
          <Menu
            setShowModal={setShowModal}
            handlePress={handlePress}
            setShowSim={setShowSim}
          />
        </PresenceTransition>
      )}
    </View>
  );
};

const Menu = ({ setShowModal, handlePress, setShowSim }) => {
  return (
    <View flex={1}>
      <Lottie
        animationData={cube}
        loop={true}
        style={{
          position: "absolute",
          zIndex: -10,
          width: "100%",
        }}
      />
      <Center flex={1}>
        <Text
          textAlign={"center"}
          w={"60%"}
          mb="28%"
          fontSize={"1.4em"}
          fontFamily={"Thin"}
        >
          Conways Game of life
        </Text>
      </Center>
      <VStack
        alignItems={"center"}
        space={"0.8em"}
        w={"100%"}
        position={"absolute"}
        bottom={"12%"}
      >
        <Button
          onPress={() => setShowSim(true)}
          w="75%"
          variant={"outline"}
          fontSize={"1em"}
        >
          Run Simulation
        </Button>
        <Button
          onPress={() => handlePress()}
          w="75%"
          variant={"outline"}
          fontSize={"1em"}
        >
          View Code
        </Button>
        <Button
          onPress={() => setShowModal(true)}
          w="75%"
          variant={"outline"}
          fontSize={"1em"}
        >
          Go Home
        </Button>
      </VStack>
    </View>
  );
};

const Grid = ({ width, height, setShowSim }) => {
  const celldim = useBreakpointValue({
    base: 14,
    sm: 14,
    md: 20,
    lg: 16,
    xl: 11,
    xxl: 12,
  });
  const cellSize = celldim; // in pixels

  const rows = Math.floor(height / cellSize);
  const cols = Math.floor(width / cellSize);

  const [prevState, setPrevState] = useState(new Set());
  const [state, setState] = useState(new Set());
  const [generation, setGeneration] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [isPopulated, setIsPopulated] = useState(false); // new state

  const calculateNeighbors = useCallback(
    (cell) => {
      const [x, y] = cell.split(",").map(Number);
      const neighbors = [];
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) continue;
          const neighborX = x + i;
          const neighborY = y + j;
          if (
            // if the neighbor is within the bounds of the grid
            neighborX >= 0 &&
            neighborX < rows &&
            neighborY >= 0 &&
            neighborY < cols
          ) {
            neighbors.push(`${neighborX},${neighborY}`);
          }
        }
      }
      return neighbors;
    },
    [rows, cols]
  );

  const calculateNextState = useCallback(() => {
    const newState = new Set();
    const potentialCells = new Set();
    state.forEach((cell) => {
      const neighbors = calculateNeighbors(cell);
      let liveNeighbors = 0;
      neighbors.forEach((n) => {
        if (state.has(n)) liveNeighbors++;
        else potentialCells.add(n);
      });
      if (liveNeighbors === 2 || liveNeighbors === 3) newState.add(cell);
    });

    potentialCells.forEach((cell) => {
      const neighbors = calculateNeighbors(cell);
      let liveNeighbors = 0;
      neighbors.forEach((n) => {
        if (state.has(n)) liveNeighbors++;
      });
      if (liveNeighbors === 3) newState.add(cell);
    });

    if (generation > 1000 || areSetsEqual(newState, prevState)) {
      setResolved(true);
      return;
    }

    setPrevState(state);
    setState(newState);
    setGeneration((gen) => gen + 1);
  }, [state, calculateNeighbors, generation, prevState]);

  const populate = useCallback(() => {
    const initialCells = new Set();
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.random() > 0.7) initialCells.add(`${i},${j}`);
      }
    }
    setState(initialCells);
    setIsPopulated(true); // set to true after populating
  }, []);

  useEffect(() => {
    populate();
  }, [populate]);

  useEffect(() => {
    if (!isPopulated) return; // check if population has been done
    const intervalId = setInterval(() => {
      calculateNextState();
    }, 60);
    return () => clearInterval(intervalId);
  }, [calculateNextState, isPopulated]);

  const areSetsEqual = (a, b) => {
    if (a.size !== b.size) return false;
    for (let item of a) if (!b.has(item)) return false;
    return true;
  };

  const transitions = useTransition([...state], {
    from: { transform: "scale(0)" },
    enter: {
      transform: "scale(1.03)",
      config: {
        type: "timing",
        duration: 90,
      },
    },
    leave: {
      transform: "scale(0)",
      config: {
        type: "timing",
        duration: 190,
      },
    },
    keys: (item) => item,
  });

  return (
    <View w={width} h={height} borderWidth={1}>
      <AlertOverlay visible={resolved} fadeDuration={300} fadeOpacity={0.8}>
        <PostOverlay isDone={resolved} color="teal.500">
          <Text>{`Simulation Ended at genereration ${generation}`}</Text>
          <Button onPress={() => setShowSim(false)}>back</Button>
        </PostOverlay>
      </AlertOverlay>
      <Text position={"absolute"} zIndex={"20"} top={0}>
        {generation}
      </Text>

      {transitions((style, item) => {
        const [i, j] = item.split(",").map(Number);
        const key = `${i},${j}`;
        return (
          <animated.div
            key={key}
            style={{
              ...style,
              position: "absolute",
              top: `${i * cellSize}px`,
              left: `${j * cellSize}px`,
              height: `${cellSize}px`,
              width: `${cellSize}px`,
              backgroundColor: "white",
              borderRadius: "2px",
            }}
          />
        );
      })}
    </View>
  );
};

{
  /* <PresenceTransition
visible={grid[i][k] && true}
initial={{
  scale: 0,
}}
animate={{
  scale: 1,
  transition: { type: "spring", mass: 0.5, damping: 10 },
}}
exit={{
  scale: 0,
  transition: { type: "timing", duration: 100 },
}}
key={`${i}-${k}`}
style={{
  width: cellSize,
  height: cellSize,
  backgroundColor: "violet",
  borderRadius: "10%",
}}
/> */
}
