import {
  Center, Heading, SectionList, Box, Text, VStack, Fab, Button, HStack, AddIcon, ArrowForwardIcon, Pressable
} from "native-base";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import useMeasure from "react-use-measure";
import React from "react";
import { useState } from "react";


const SPACING = 8; // spacing between items
const ITEM_HEIGHT = 48; // height of each item
const ADD_BUTTON_SIZE = 40; // size of the add button


const TaskScreen = ({ tasks, handleTaskPress, addTask }) => {
  const [ref, { height }] = useMeasure();
  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: { tension: 300, friction: 30 },
  }));

  const numTasks = tasks.length;

  const bounds = {
    top: ((ITEM_HEIGHT + SPACING) * numTasks - height),
    bottom: 0,
  };

  const bind = useDrag(
    ({ event, distance, offset: [, y] }) => {
      api.start({ y: y });
    },
    {
      bounds: bounds,
      rubberband: 0.2,
    }
  );
  const data = [{
    title: "Active",
    data: [...tasks.filter(item => !item.completed)]
  }, {
    title: "Completed",
    data: [...tasks.filter(item => item.completed)]
  },
  ];


  return (
    <animated.div
      {...bind()}
      style={{

        width: "100%",
        transform: y.to((y) => `translate3d(0,${y}px,0)`),
      }}
    >
      <Pressable onPress={addTask} borderRadius={'2'} bg={'lightBlue.400'} w="40px" h="40px">
        <AddIcon m="auto" flex="1" size="4" color="muted.600" />
      </Pressable>
      <Box ref={ref} p='8px'>
        <SectionList w="100%"
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index, section }) =>
            <Pressable onPress={() => handleTaskPress(item)} borderWidth={1} p='4' my={'2'} flexDirection={'row'}>
              <Box flex={1}>
                <Text>{item.name}</Text>
                <Text>{item.minutes} minutes</Text>
              </Box>
              <Center>
                {section.title === 'Active' && <ArrowForwardIcon size="5" color="muted.600" />}
              </Center>


            </Pressable>
          }

          renderSectionHeader={({ section: { title } }) =>
            <Text fontSize="xl" mt="8" pb="4">
              {title}
            </Text>
          }
        />
      </Box>
    </animated.div >

  )
};

export default TaskScreen;
