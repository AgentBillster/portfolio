import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Button,
  Center,
  PresenceTransition,
  Text,
  VStack,
  View,
  useBreakpointValue,
  useMediaQuery,
  HStack,
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
import * as THREE from 'three';

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
    base: 4,
    sm: 4,
    md: 6,
    lg: 5,
    xl: 4,
    xxl: 4,
  });
  const cellSize = celldim;
  const canvasRef = useRef(null);
  const [prevState, setPrevState] = useState(new Set());
  const [state, setState] = useState(new Set());
  const [generation, setGeneration] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [isPopulated, setIsPopulated] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef(null);

  const baseInterval = 60; // Base interval in milliseconds
  const minSpeed = 0.25;  // Slowest speed (4x slower)
  const maxSpeed = 4;     // Fastest speed (4x faster)

  const rows = Math.floor(height / cellSize);
  const cols = Math.floor(width / cellSize);

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
        if (Math.random() > 0.8) initialCells.add(`${i},${j}`);
      }
    }
    setState(initialCells);
    setIsPopulated(true);
  }, [rows, cols]);

  useEffect(() => {
    populate();
  }, [populate]);

  useEffect(() => {
    if (!isPopulated || isPaused) return;
    const interval = baseInterval / speed;
    intervalRef.current = setInterval(() => {
      calculateNextState();
    }, interval);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [calculateNextState, isPopulated, isPaused, speed]);

  const areSetsEqual = (a, b) => {
    if (a.size !== b.size) return false;
    for (let item of a) if (!b.has(item)) return false;
    return true;
  };

  const handleEndSimulation = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setResolved(true);
  };

  const handleSpeedChange = (delta) => {
    setSpeed(prevSpeed => {
      const newSpeed = prevSpeed + delta;
      return Math.min(Math.max(newSpeed, minSpeed), maxSpeed);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= rows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(width, i * cellSize);
      ctx.stroke();
    }

    for (let j = 0; j <= cols; j++) {
      ctx.beginPath();
      ctx.moveTo(j * cellSize, 0);
      ctx.lineTo(j * cellSize, height);
      ctx.stroke();
    }

    // Draw live cells
    ctx.fillStyle = 'cyan';
    state.forEach(cell => {
      const [i, j] = cell.split(',').map(Number);
      ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
    });
  }, [state, width, height, cellSize, rows, cols]);

  return (
    <View w={width} h={height} >
      <AlertOverlay visible={resolved} fadeDuration={300} fadeOpacity={0.8}>
        <PostOverlay isDone={resolved} color="teal.500">
          <Text>{`Simulation Ended at generation ${generation}`}</Text>
          <Button onPress={() => setShowSim(false)}>back</Button>
        </PostOverlay>
      </AlertOverlay>

      <Text position={"absolute"} alignSelf={"center"} justifyContent={"center"} zIndex={"21"} bottom={"2"}>
        {generation}
      </Text>

      <HStack zIndex={"20"} bg={"black"} position={"absolute"} bottom={0} left={0} right={0} justifyContent={"space-between"} >
        <Button
          width={"50%"}
          zIndex={"20"}
          variant={"ghost"}
          size="sm"
          onPress={handleEndSimulation}
          bg={"black"}
          _pressed={{
            bg: "rgba(255,255,255,0.1)",
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "white",
              marginLeft: 4,
            }}
          >
            End
          </Text>
        </Button>

        {/* Speed Controls */}
        <HStack
          width={"50%"}
          zIndex={"20"}
          right={0}
          top={0}
          justifyContent={"center"}
          alignItems={"center"}
          bg={"black"}

        >
          <Button
            variant={"ghost"}
            size="sm"
            onPress={() => handleSpeedChange(-0.25)}
            isDisabled={speed <= minSpeed}
            _pressed={{
              bg: "rgba(255,255,255,0.1)",
            }}
          >
            <Text fontWeight={"bold"} style={{ color: "white", fontSize: 18 }}>−</Text>
          </Button>
          <Text fontWeight={"bold"} style={{ color: "white", fontSize: 16 }}>
            {speed.toFixed(2)}x
          </Text>
          <Button
            variant={"ghost"}
            size="sm"
            onPress={() => handleSpeedChange(0.25)}
            isDisabled={speed >= maxSpeed}
            _pressed={{
              bg: "rgba(255,255,255,0.1)",
            }}

          >
            <Text fontWeight={"bold"} style={{ color: "white", fontSize: 18 }}>+</Text>
          </Button>
        </HStack>
      </HStack>


      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
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
