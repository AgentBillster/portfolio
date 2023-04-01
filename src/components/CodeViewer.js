import { useBreakpointValue, useColorMode } from "native-base";
import React from "react";
import { CodeBlock, a11yLight, a11yDark } from "react-code-blocks";

const codeBlocks = {
  "NBaseForm.js": `export const NBaseForm = ({ addTask }) => {
    const [taskName, setTaskName] = useState("Hire Will");
    const [minutes, setMinutes] = useState(15);
    const [isToggledOn, toggle] = useToggle();
  
    if (isToggledOn) {
      return (
        <PresenceTransition
          visible
          style={{
            position: "absolute",
            width: "100%",
            bottom: "0",
          }}
          initial={{
            translateY: 400,
            opacity: 0,
          }}
          animate={{
            translateY: 0,
            opacity: 1,
  
            transition: {
              duration: 250,
              type: "spring",
              useNativeDriver: false,
            },
          }}
        >
          <VStack borderRadius={"20px"} p={"3"} bg="white" flex={1}>
            <Text mt={"2"} textAlign={"center"}>
              New Task
            </Text>
  
            <Box mt={"6"}>
              <Text>Name</Text>
              <Input
                value={taskName}
                onChangeText={(text) => setTaskName(text)}
              />
            </Box>
  
            <Box mt={"6"}>
              <Text>Select duration:</Text>
              <HStack space={2}>
                {[25, 50, 75, 100].map((m) => (
                  <Button
                    key={m}
                    variant={minutes === m ? "solid" : "outline"}
                    onPress={() => setMinutes(m)}
                  >
                    {\`\${m} min\`}
                  </Button>
                ))}
              </HStack>
            </Box>
            <Button
              mb={"4"}
              mt={"10"}
              onPress={() => {
                addTask(taskName, minutes);
                toggle();
              }}
            >
              Add Task
            </Button>
          </VStack>
        </PresenceTransition>
      );
    } else {
      return (
        <Button
          position={"absolute"}
          right="4px"
          bottom="4px"
          p={"5"}
          borderRadius={"10"}
          endIcon={<AddIcon size="6" />}
          onPress={toggle}
        />
      );
    }
  };
  `,
  "NBaseHeader.js": `export const NBaseHeader = ({ title, color }) => {
    return (
      <>
        <StatusBar bg={color} barStyle="light-content" />
        <Box safeAreaTop bg="violet.400" />
        <HStack
          bg={color}
          px="1"
          py="3"
          h={"20%"}
          justifyContent="center"
          alignItems="center"
          w="100%"
          maxW="350"
        >
          <Text fontSize={["10px", "20px", "35px"]} fontWeight="bold">
            {title}
          </Text>
        </HStack>
      </>
    );
  };`,
  "NBaseTabs.js": `export const NBaseTabs = ({ tabs, handleTabToggle, activeTab }) => {
    return (
      <Box px="4">
        <HStack>
          {tabs.map((item, index) => (
            <Pressable
              key={index}
              borderBottomWidth={activeTab === item ? 1 : 0}
              onPress={() => {
                handleTabToggle(item);
              }}
              w="49%"
              p={2}
            >
              <Text variant="tagtext" fontFamily="Light" textAlign={"center"}>
                {item}
              </Text>
            </Pressable>
          ))}
        </HStack>
      </Box>
    );
  };
  `,
  "NBaseList.js": `export const NBaseList = ({ tasks, handleTaskPress }) => {
    return (
      <>
        <ScrollViewPlus>
          {tasks.map((task, i) => (
            <Pressable
              _hover={{
                bg: "gray.500",
              }}
              w="100%"
              borderWidth={1}
              onPress={() => {
                handleTaskPress(task);
              }}
              mt={4}
              px="6"
              alignItems={"center"}
              py="4"
              borderRadius="6"
              key={i}
              flexDir="row"
              justifyContent={"space-between"}
            >
              <VStack>
                <Text fontSize={["10px", "20px", "28px", "50px"]}>
                  {task.name}
                </Text>
                <Text fontSize={["10px", "20px", "24px", "50px"]}>
                  {\`\${task.minutes / 25} \${
                    task.minutes === 25 ? "interval" : "intervals"
                  }\`}
                </Text>
              </VStack>
              {!task.completed ? (
                <ArrowForwardIcon size={["0px", "7px", "12px", "50px"]} />
              ) : (
                <DeleteIcon size={["0px", "7px", "12px", "50px"]} />
              )}
            </Pressable>
          ))}
        </ScrollViewPlus>
      </>
    );
  };
  `,
  "useNavigation.js": `export const useNavigation = (initialScreen, screenMap) => {
    const [activeScreen, setActiveScreen] = useState(initialScreen);
    const [props, setProps] = useState({});
  
    const navigateToScreen = (screenName, screenProps) => {
      if (screenName in screenMap) {
        setActiveScreen(screenName);
        setProps(screenProps || {});
      } else {
        console.error(\`Screen '\${screenName}' not found in screenMap\`);
      }
    };
  
    const getScreenComponent = () => {
      if (activeScreen in screenMap) {
        const ScreenComponent = screenMap[activeScreen];
        return (
          <ScreenComponent
            {...props}
            activeScreen={activeScreen}
            navigateToScreen={navigateToScreen}
          />
        );
      } else {
        console.error(\`Screen '\${activeScreen}' not found in screenMap\`);
        return null;
      }
    };
  
    return {
      activeScreen,
      navigateToScreen,
      getScreenComponent,
    };
  };
  `,
  "useToggle.js": `export const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);
    const toggle = useCallback(() => {
      setValue((v) => !v);
    }, []);
    return [value, toggle];
  };
  `,
  "TaskScreen.js": `export const TaskScreen = ({ activeScreen, navigateToScreen }) => {
    const [activeTab, setActiveTab] = useState("active");
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      const storedData = localStorage.getItem("tasks");
      const parsedData = storedData ? JSON.parse(storedData) : [];
      if (activeTab === "active") {
        setTasks(parsedData.filter((task) => !task.completed));
      } else {
        setTasks(parsedData.filter((task) => task.completed));
      }
    }, [tasks]);
  
    const addTask = (name, minutes) => {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      const id = Math.max(...tasks.map((task) => task.id)) + 1;
      const newTask = {
        id: id,
        name: name,
        minutes: minutes,
        completed: false,
      };
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    };
  
    const handleTaskPress = (task) => {
      if (task.completed) {
        deleteTask(task.id);
      } else {
        navigateToScreen("Timer", { task, completeTask });
      }
    };
  
    const completeTask = (id, taskData) => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) {
        console.warn("CANT FIND THAT MA BOI");
      }
      tasks[taskIndex].completed = true;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      navigateToScreen("Tasks");
    };
  
    const deleteTask = (id) => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    };
  
    const handleTabToggle = (tab) => {
      if (tab === activeTab) {
        return console.warn("tab is already active");
      } else {
        setActiveTab(tab);
      }
    };
  
    return (
      <>
        <NBaseHeader title={activeScreen} />
        <NBaseTabs
          tabs={["active", "completed"]}
          activeTab={activeTab}
          handleTabToggle={handleTabToggle}
        />
        <NBaseList tasks={tasks} handleTaskPress={handleTaskPress} />
        <NBaseForm addTask={addTask} />
      </>
    );
  };`,
  "TimerScreen.js": `export const TimerScreen = ({ task, completeTask, activeScreen }) => {
    const [intervalCount, setIntervalCount] = useState(0);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
    const [isPaused, setIsPaused] = useState(true);
    const [isBreak, setIsBreak] = useState(false);
  
    useEffect(() => {
      let interval = null;
      if (!isPaused && secondsRemaining > 0) {
        interval = setInterval(() => {
          setSecondsRemaining((seconds) => seconds - 1);
          setSecondsElapsed((seconds) => seconds + 1);
        }, 1000);
      } else {
        clearInterval(interval);
        if (secondsRemaining === 0) {
          setIsPaused(true);
          setIsBreak(!isBreak);
          setSecondsRemaining(isBreak ? 5 * 60 : 25 * 60); // Break time is 5 minutes, work time is 25 minutes
          setSecondsElapsed(0);
        } else if (isPaused && isBreak) {
          interval = setInterval(() => {
            setSecondsRemaining((seconds) => seconds - 1);
            setSecondsElapsed((seconds) => seconds + 1);
          }, 1000);
        }
      }
      return () => clearInterval(interval);
    }, [isPaused, secondsRemaining, isBreak]);
  
    const handlePlayPause = () => {
      setIsPaused(!isPaused);
    };
  
    const handleSkip = () => {
      setIsPaused(true);
      setIsBreak(!isBreak);
      setSecondsElapsed(0);
      setSecondsRemaining(isBreak ? 25 * 60 : 5 * 60); // Go to next phase
      setIntervalCount((intervalCount) => intervalCount + 1);
    };
  
    const minutes = Math.floor(secondsRemaining / 60);
  
    const handleCompleteTask = () => {
      const taskData = {
        intervalCount,
        secondsElapsed,
      };
      completeTask(task.id, taskData);
    };
  
    return (
      <Center pt="16">
        <VStack space="4">
          <Text fontSize={"32px"} fontFamilt="Medium">
            {task.name}
          </Text>
          <Center
            borderWidth={2}
            borderColor="rgb(80,80,80)"
            borderRadius="full"
            p="12"
          >
            <Text fontWeight="Light">
              {isBreak ? "Break Time!" : "Work Time!"}
            </Text>
            <Text fontSize="50px">
              {minutes < 10 ? \`0\${minutes}\` : minutes}:
              {secondsRemaining % 60 < 10
                ? \`0\${secondsRemaining % 60}\`
                : secondsRemaining % 60}
            </Text>
          </Center>
  
          {!isBreak && (
            <Button onPress={handlePlayPause}>
              {isPaused ? "Play" : "Pause"}
            </Button>
          )}
          {isBreak && <Button onPress={handleCompleteTask}>Done!</Button>}
          <Button onPress={handleSkip}>skip</Button>
          <Text fontSize="18px">{\`interval \${intervalCount + 1}\`}</Text>
        </VStack>
      </Center>
    );
  };
  `,
  "Pomodoro.js": `const Pomodoro = () => {
    const { getScreenComponent } = useNavigation("Tasks", {
      Tasks: TaskScreen,
      Timer: TimerScreen,
    });

    return (
      <Box bg="white" w={"100%"} h={"100%"}>
        {getScreenComponent()}
      </Box>
    );
  };
  
  export default Pomodoro;
  `,
  "Readme.md": `Pomodoro App 🍅
This application is designed to help you manage your time more effectively using the Pomodoro Technique.

The Pomodoro Technique is a time management technique that involves breaking work into 25-minute intervals, separated by short breaks in order to increase productivity and reduce burnout.

The Pomodoro App provides a VERY simple interface for managing your Pomodoro sessions. To get started, simply select the created task and hit start. For demo purposes im not going to make you wait so ive included a skip button that will take you to the next interval/break
`,
};

export const CodeViewer = ({ activeFile = "Readme.md" }) => {
  const codeSize = useBreakpointValue([2, 16, 20, 24]);
  const code = codeBlocks[activeFile];
  const { colorMode } = useColorMode();
  const theme = colorMode === "light" ? a11yLight : a11yDark;

  return (
    <CodeBlock
      theme={theme}
      wrapLongLines={true}
      customStyle={{
        height: "100%",
        fontSize: codeSize,
        fontFamily: "Light",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
      text={code || "No code to display yet."}
      language={activeFile === "Readme.md" ? "makefile" : "jsx"}
    />
  );
};
