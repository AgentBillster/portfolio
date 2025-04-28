import { useBreakpointValue, useColorMode } from "native-base";
import React from "react";
import {
  CodeBlock,
  a11yLight,
  a11yDark,
  dracula,
  solarizedDark,
  atomOneDark,
  tomorrowNight,
} from "react-code-blocks";

const codeBlocks = {
  Pomodoro: {
    "TaskList.js": `export const TaskList = ({
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
                    >{\`delete task\`}</Button>
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
    };`,
    "HeaderBar.js": `export const HeaderBar = ({ title, rightButton, leftButton }) => {
      return (
        <HStack bg={"color"} w="95%" alignSelf={"center"} h="8%" p={2}>
          <View alignItems={"center"} justifyContent={"center"} flex="0.15">
            {leftButton && leftButton}
          </View>
    
          <View
            alignItems={"center"}
            justifyContent={"center"}
            borderColor={"white"}
            flex="0.7"
            p="6px"
          >
            {title}
          </View>
    
          <View p="3px" alignItems={"center"} justifyContent={"center"} flex="0.15">
            {rightButton && rightButton}
          </View>
        </HStack>
      );
    };
    `,
    "TaskCard.js": `export const TaskCard = ({
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
          return \`\${minutes} \${minutes === 1 ? "minute" : "minutes"} ago\`;
        } else if (hours < 24) {
          return \`\${hours} \${hours === 1 ? "hour" : "hours"} ago\`;
        } else if (days < 7) {
          return \`\${days} \${days === 1 ? "day" : "days"} ago\`;
        } else {
          const date = new Date(timestamp);
          const day = date
            .toLocaleString("en-us", { weekday: "short" })
            .toUpperCase();
          const month = date
            .toLocaleString("en-us", { month: "short" })
            .toUpperCase();
          const dateStr = date.toLocaleString("en-us", { day: "numeric" });
          return \`\${day}, \${dateStr} \${month}\`;
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
              >{\`\${resumeFromInterval} of \${item.intervals}\`}</Text>
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
                  left={\`\${8 + i * 8}%\`}
                  top={\`\${8 + i * 8}%\`}
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
    };`,
    "AlertOverlay.js": `export const AlertOverlay = React.memo(
      ({ visible, onBodyPress, children, fadeDuration, fadeOpacity }) => {
        return (
          <PresenceTransition
            visible={visible}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: fadeDuration,
              },
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              backgroundColor: \`rgba(0,0,0, \${fadeOpacity})\`,
              zIndex: 10,
            }}
          >
            <Pressable
              w={"100%"}
              h="100%"
              alignItems={"center"}
              justifyContent={"center"}
              onPress={() => onBodyPress && onBodyPress()}
            >
              {children}
            </Pressable>
          </PresenceTransition>
        );
      }
    );`,
    "ChoiceModal.js": `export const ChoiceModal = ({
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
    };`,
    "NavWidget.js": `export const NavWidget = ({ buttons }) => {
      return (
        <Center
          w="100%"
          position={"absolute"}
          flexDir={"row"}
          zIndex={2}
          bottom={"1%"}
        >
          <HStack
            p="1.5%"
            bg="rgb(240,240,240)"
            borderRadius={"35px"}
            space={"5px"}
            style={{
              boxShadow: "0px 0px 16px 0px rgba(0,0,0,0.55)",
            }}
          >
            {buttons.map((button, index) => button)}
          </HStack>
        </Center>
      );
    };
    `,
    "NewTask.js": `export const NewTask = ({ showForm, close, handleTaskAdd }) => {
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
                    {\`\${value} mins\`}
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
                    {\`\${value} pomodoro\`}
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
    };`,
    "OnBoarding.js": `const data = [
      {
        id: "1",
        head: "Meet Your Goals",
        text: "The pomodoro application help you stay productive by breaking down your tasks into 25 minute intervals",
        anim: dudefloating,
      },
      {
        id: "2",
        head: "Never Burn out",
        text: "disconecting for a short time helps mental wellbeing by reducing fatigue and increasing motivation.",
        anim: tea,
      },
      {
        id: "3",
        head: "Lets get Productive!",
        text: "",
        anim: mato,
      },
    ];
    
    export const Onboarding = ({ onEnd }) => {
      const scrollref = useRef();
      const numRef = useRef(1);
      const [ref, { width, height }] = useMeasure();
    
      const handlePress = (page) => {
        const currentPage = page + 1;
        const pagetoScrollTo = width * currentPage;
        numRef.current = currentPage;
        if (pagetoScrollTo < width * data.length) {
          scrollref.current.scrollTo({ x: pagetoScrollTo, animated: true });
        } else {
          onEnd();
        }
      };
    
      return (
        <View ref={ref} w={"100%"} h="100%" borderWidth={1}>
          <ScrollView
            w={"100%"}
            h={"100%"}
            ref={scrollref}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          >
            {data.map((item, index) => {
              return (
                <VStack w={width} h={height} p="1%">
                  <Center flex={0.45}>
                    <Lottie
                      animationData={item.anim}
                      loop={true}
                      style={{
                        width: "105%",
                        height: "105%",
                      }}
                    />
                  </Center>
    
                  <Center mt="6%" flex={0.5}>
                    <Text
                      textAlign={"center"}
                      fontFamily={"SemiBold"}
                      fontSize={"2.8em"}
                      lineHeight={"50px"}
                    >
                      {item.head}
                    </Text>
                    <Text
                      textAlign={"center"}
                      fontFamily={"Light"}
                      fontSize={"1em"}
                      mt={"10px"}
                    >
                      {item.text}
                    </Text>
                    <Pressable
                      mt={"4%"}
                      borderRadius={"10px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderColor={"muted.300"}
                      bg="white"
                      w={"90%"}
                      h={"14%"}
                      onPress={() => handlePress(index)}
                    >
                      <Text _dark={{ color: "black" }}>
                        {index === data.length - 1 ? "start" : "next"}
                      </Text>
                    </Pressable>
                    <Pressable
                      mt={"5%"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      onPress={() => onEnd()}
                    >
                      <Text>{"skip"}</Text>
                    </Pressable>
                  </Center>
                </VStack>
              );
            })}
          </ScrollView>
        </View>
      );
    };
    `,
    "TaskScreen.js": `export const TaskScreen = ({ closeApp, viewCode, navigate, propData }) => {
      const [showModal, setShowModal] = useState(false);
      const [showAlert, setShowAlert] = useState(false);
      const [showForm, setShowForm] = useState(false);
    
      const [isMobileDevice] = useMediaQuery({ maxWidth: 500 });
      const [taskData, setTaskData] = useState([]);
      const [loading, setLoading] = useState(true);
    
      const fetchData = () => {
        return new Promise((resolve, reject) => {
          const taskData = localStorage.getItem("taskData");
          if (taskData) {
            resolve(JSON.parse(taskData));
          } else {
            reject("No data found in local storage");
          }
        });
      };
    
      useEffect(() => {
        fetchData()
          .then((data) => {
            setTaskData(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [showModal]);
    
      const saveTimeData = (timeData, taskName) => {
        const newData = [...taskData];
    
        const taskObj = newData[0].data.find(
          (task) => task.task.toLowerCase() === taskName.toLowerCase()
        );
    
        if (timeData.completed) {
          taskObj.touched = timeData;
          const index = newData[0].data.indexOf(taskObj);
          newData[0].data.splice(index, 1);
          newData[1].data.unshift(taskObj);
        } else {
          if (taskObj.touched) {
            taskObj.touched.resumeFromInterval += timeData.resumeFromInterval;
            taskObj.touched.total += timeData.total;
            taskObj.touched.completed = timeData.completed;
          }
          taskObj.touched = timeData;
        }
    
        setTaskData(...newData);
        localStorage.setItem("taskData", JSON.stringify(newData));
      };
    
      const handleTaskAdd = (task, setErrorState) => {
        if (!task.task) {
          setErrorState("Task is empty");
          return;
        }
        // make copy of taskdata
        const updatedTaskList = [...taskData];
        // check for duplicate task
        const taskExists = updatedTaskList[0].data.some(
          (existingTask) =>
            existingTask.task.toLowerCase() === task.task.toLowerCase()
        );
        if (taskExists) {
          setErrorState("Task already exists!");
          return;
        }
        updatedTaskList[0].data.unshift(task);
        localStorage.setItem("taskData", JSON.stringify(updatedTaskList));
        setTaskData(updatedTaskList);
        setShowForm(false);
      };
    
      const handleTaskPress = (task) => {
        navigate("Timer", { task, saveTimeData });
      };
    
      const handleTaskArchive = (taskName) => {
        // Make a copy of taskData
        const updatedTaskList = [...taskData];
    
        // Find the index of the task in the "todo" array
        const taskIndex = updatedTaskList[0].data.findIndex(
          (task) => task.task.toLowerCase() === taskName.toLowerCase()
        );
    
        // Remove the task from the "todo" array and add it to the "archive" array (findIndex returns -1 if not found)
        if (taskIndex !== -1) {
          const taskToArchive = updatedTaskList[0].data.splice(taskIndex, 1)[0];
    
          // give completed properties
          const touched = {
            completed: true,
            total: 25 * 60 * taskToArchive.intervals,
          };
    
          taskToArchive.touched = touched;
          updatedTaskList[1].data.push(taskToArchive);
    
          // Save the updated copy and update the state
          localStorage.setItem("taskData", JSON.stringify(updatedTaskList));
          setTaskData(updatedTaskList);
        }
      };
    
      const handleTaskDeletion = (taskNames) => {
        // Make a copy of taskData
        const updatedTaskList = [...taskData];
    
        taskNames.forEach((taskName) => {
          const taskIndex = updatedTaskList[1].data.findIndex(
            (task) => task.task.toLowerCase() === taskName.toLowerCase()
          );
    
          // If found, remove the task from the array (findIndex returns -1 if not found)
          if (taskIndex !== -1) {
            updatedTaskList[1].data.splice(taskIndex, 1);
          }
        });
    
        // Save the updated copy and update the state
        localStorage.setItem("taskData", JSON.stringify(updatedTaskList));
        setTaskData(updatedTaskList);
      };
    
      // ============== UI triggerables + logic ============== //
    
      const widgetButtons = [
        <IconButton
          onPress={() => setShowModal(true)}
          icon={<HomeIcon size="35%" />}
          size={"60px"}
          bg={"red.400"}
          borderRadius={"35px"}
        />,
        <IconButton
          onPress={() => {
            isMobileDevice ? setShowAlert(true) : viewCode();
          }}
          icon={<CodeIcon size="35%" />}
          size={"60px"}
          bg={"rgb(215,215,215)"}
          borderRadius={"35px"}
        />,
      ];
    
      if (loading) {
        return <Spinner />;
      }
    
      return (
        <Box flex={1}>
          <NavWidget buttons={widgetButtons} />
    
          {/* Triggered ui elements */}
          <ChoiceModal
            showModal={showModal}
            body="Are you sure you want to exit?"
            confirm="yes"
            deny="no"
            onDeny={() => setShowModal(false)}
            onConfirm={() => {
              closeApp();
              setShowModal(false);
            }}
          />
          <AlertOverlay
            fadeOpacity={0.7}
            visible={showAlert}
            onBodyPress={() => setShowAlert(false)}
          >
            <Text>Turn Device to landscape to continue</Text>
            <LandscapeIcon size="40px" />
          </AlertOverlay>
    
          <NewTaskForm
            showForm={showForm}
            handleTaskAdd={handleTaskAdd}
            close={() => setShowForm(false)}
          />
    
          {/* visibile always */}
          <TaskList
            data={taskData}
            setShowForm={setShowForm}
            handleTaskPress={handleTaskPress}
            handleTaskArchive={handleTaskArchive}
            handleTaskDeletion={handleTaskDeletion}
          />
        </Box>
      );
    };`,
    "TimerScreen.js": `export const TimerScreen = ({ propData, navigate }) => {
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
            ? \`0\${remainingSeconds}\`
            : remainingSeconds.toString();
    
        return \`\${formattedMinutes}:\${formattedSeconds}\`;
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
                  {minutes < 10 ? \`0\${minutes}\` : minutes}:
                  {secondsRemaining % 60 < 10
                    ? \`0\${secondsRemaining % 60}\`
                    : secondsRemaining % 60}
                </Text>
                <Text variant={"timerscreensub"}>{\`Pomodoro \${
                  intervalCount + 1
                } of \${propData.task.intervals}\`}</Text>
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
    `,
    "Pomodoro.js": `const Pomodoro = ({ closeApp, viewCode }) => {
      // for basic nav
      const [page, setPage] = useState("Tasks");
    
      // for passing data between nav screens
      const [propData, setPropData] = useState(null);
      // for ensuring onboarding screen presents to user only once
      const [setup, setSetup] = useState(false);
    
      // check screen size. breakpoint comes from nativebase themeOBJ
      const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });
    
      // get setup screen if user is not setup
      useEffect(() => {
        const storedValue = localStorage.getItem("setup");
        if (storedValue) {
          setSetup(JSON.parse(storedValue));
        } else {
          localStorage.setItem("setup", JSON.stringify(false));
          setSetup(false);
        }
        if (!localStorage.getItem("taskData")) {
          localStorage.setItem("taskData", JSON.stringify(initialData));
        }
      }, []);
    
      const navigate = (page, data) => {
        setPropData(data || null);
        setPage(page);
      };
    
      const pages = {
        Tasks: (
          <TaskScreen
            propData={propData || null}
            navigate={navigate}
            closeApp={closeApp}
            viewCode={viewCode}
          />
        ),
        Timer: <TimerScreen propData={propData || null} navigate={navigate} />,
      };
    
      return (
        <View bg="rgb(7,7,7)" w={"100%"} h={isMobile ? "100%" : "92%"}>
          <SplashScreen anim={pomo} app={"Pomodoro"} />
          {setup ? (
            pages[page]
          ) : (
            <Onboarding
              onEnd={() => {
                setSetup(true);
                localStorage.setItem("setup", JSON.stringify(true));
              }}
            />
          )}
        </View>
      );
    };`,
    "Readme.md": `Welcome to the Pomodoro App 🍅\n
    My recent innovation – a custom Pomodoro app – has changed my approach to productivity.
    As an individual with ADHD, maintaining a steady focus can be challenging.
    The urge to juggle multiple tasks at once is often overwhelming, leading to a spiral of scattered attention and incomplete work.
    To navigate this issue, I've built a solution that combines a task management system with the Pomodoro technique.
    This unique hybrid has significantly enhanced my productivity, granting me a greater sense of control over my tasks and helping me maintain a consistent workflow.
    As for the technical backbone of this application, it is just React and Nativebase.
    `,
  },

  Conways: {
    "Conways.js": `export const Conways = ({ closeApp, viewCode }) => {
    const [ref, { width, height }] = useMeasure();
    const GridProps = { width, height };
  
    const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSim, setShowSim] = useState(false);
  
    const overlayProps = {
      showAlert,
      setShowAlert,
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
        <ChoiceModal {...modalProps} />
        <AlertOverlay {...overlayProps}>
          <Text>Turn Device to landscape to continue</Text>
          <LandscapeIcon size="40px" />
        </AlertOverlay>
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
  };`,

    "Implementation.js": ` 
   // Reference for the container to get dimensions
  const containerRef = useRef(null);
  // Three.js objects
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const instancedMeshRef = useRef(null);
  const requestRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  // Game state
  const [showMenu, setShowMenu] = useState(true);
  const [showSim, setShowSim] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cellSize, setCellSize] = useState(1.2);
  const [gridSize, setGridSize] = useState({ rows: 100, cols: 100 });
  const [speed, setSpeed] = useState(5); // Updates per second

  // State for cells - using a Map for performance with large grids
  const [grid, setGrid] = useState(() => new Map());
  const [prevGrid, setPrevGrid] = useState(() => new Map());

  // Animation data
  const cellAnimations = useRef(new Map());
  const [resolved, setResolved] = useState(false);

  // Set up the Three.js scene
  const initThree = () => {
    scene.background = new THREE.Color(0x000000); // Pure black

    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070707);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = Math.max(gridSize.rows, gridSize.cols) * cellSize * 0.8;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Grid visualization (optional)
    // const gridHelper = new THREE.GridHelper(
    //   Math.max(gridSize.rows, gridSize.cols) * cellSize,
    //   Math.max(gridSize.rows, gridSize.cols),
    //   0x444444,
    //   0x222222
    // );
    // scene.add(gridHelper);

    // Create instanced mesh for cells
    createInstancedMesh();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (!controlsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      const delta = clockRef.current.getDelta();

      // Update cell animations
      updateCellAnimations(delta);

      controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  };

  // Create instanced mesh for efficient rendering of many cells
  const createInstancedMesh = () => {
    if (!sceneRef.current) return;

    // Remove existing mesh if any
    if (instancedMeshRef.current) {
      sceneRef.current.remove(instancedMeshRef.current);
    }

    const maxInstances = gridSize.rows * gridSize.cols;

    // Create slightly rounded cell geometry
    const geometry = new THREE.BoxGeometry(cellSize * 0.9, cellSize * 0.9, cellSize * 0.2);

    // Material with glow effect
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ffff, // Cyan color
      emissive: 0x00aaaa, // Cyan-ish glow
      emissiveIntensity: 0.7,
      shininess: 50,
      transparent: true, // Enable transparency for the fade effect
      opacity: 1.0
    });

    // Create the instanced mesh
    const instancedMesh = new THREE.InstancedMesh(geometry, material, maxInstances);
    instancedMesh.count = 0; // Start with 0 visible instances
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    sceneRef.current.add(instancedMesh);
    instancedMeshRef.current = instancedMesh;

    // Reset the animations reference
    cellAnimations.current = new Map();
  };

  // Function to populate the grid with random cells
  const populateRandomGrid = (density = 0.3) => {
    const newGrid = new Map();

    for (let i = 0; i < gridSize.rows; i++) {
      for (let j = 0; j < gridSize.cols; j++) {
        if (Math.random() < density) {
          const key = i + "," + j;
          newGrid.set(key, { alive: true, age: 0 });
          // Initialize animation data for this cell
          cellAnimations.current.set(key, {
            scale: 0,
            targetScale: 1,
            jitter: {
              x: Math.random() * 0.05,
              y: Math.random() * 0.05,
              z: Math.random() * 0.05,
            },
          });
        }
      }
    }

    setGrid(newGrid);
    updateInstancedMesh(newGrid);
    setGeneration(0);
    setResolved(false);
  };

  // Calculate the next state of the grid based on Conway's rules
  const calculateNextState = () => {
    const newGrid = new Map();
    const potentialCells = new Map();

    // Check living cells and their potential to stay alive
    grid.forEach((cell, key) => {
      const [i, j] = key.split(",").map(Number);

      // Count live neighbors
      let liveNeighbors = 0;

      // Check all 8 surrounding cells
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          if (di === 0 && dj === 0) continue;

          const ni = (i + di + gridSize.rows) % gridSize.rows; // Wrap around
          const nj = (j + dj + gridSize.cols) % gridSize.cols; // Wrap around
          const neighborKey = ni + "," + nj;

          if (grid.has(neighborKey)) {
            liveNeighbors++;
          } else {
            // Add to potential cells that might come alive
            if (!potentialCells.has(neighborKey)) {
              potentialCells.set(neighborKey, { neighbors: 0 });
            }
            potentialCells.get(neighborKey).neighbors++;
          }
        }
      }

      // Apply Conway's rules for living cells
      if (liveNeighbors === 2 || liveNeighbors === 3) {
        newGrid.set(key, { alive: true, age: cell.age + 1 });

        // Update animation data
        if (!cellAnimations.current.has(key)) {
          cellAnimations.current.set(key, {
            scale: 0.1,
            targetScale: 1,
            jitter: {
              x: Math.random() * 0.05,
              y: Math.random() * 0.05,
              z: Math.random() * 0.05,
            },
          });
        } else {
          const anim = cellAnimations.current.get(key);
          anim.targetScale = 1;
          anim.jitter = {
            x: Math.random() * 0.05,
            y: Math.random() * 0.05,
            z: Math.random() * 0.05,
          };
        }
      } else {
        // Cell dies
        if (cellAnimations.current.has(key)) {
          const anim = cellAnimations.current.get(key);
          anim.targetScale = 0;
        }
      }
    });

    // Check potential cells that might come alive
    potentialCells.forEach((data, key) => {
      if (data.neighbors === 3) {
        newGrid.set(key, { alive: true, age: 0 });

        // Initialize animation data
        cellAnimations.current.set(key, {
          scale: 0,
          targetScale: 1,
          jitter: {
            x: Math.random() * 0.05,
            y: Math.random() * 0.05,
            z: Math.random() * 0.05,
          },
        });
      }
    });

    // Check if the pattern is stable or oscillating
    if (generation > 1000 || areGridsEqual(newGrid, prevGrid)) {
      setIsRunning(false);
      setResolved(true);
      return;
    }

    setPrevGrid(grid);
    setGrid(newGrid);
    setGeneration(gen => gen + 1);
    updateInstancedMesh(newGrid);
  };

  // Update the instanced mesh to reflect the current grid state
  const updateInstancedMesh = (currentGrid) => {
    if (!instancedMeshRef.current) return;

    let count = 0;
    const dummy = new THREE.Object3D();
    const halfRows = gridSize.rows / 2;
    const halfCols = gridSize.cols / 2;

    currentGrid.forEach((cell, key) => {
      const [i, j] = key.split(",").map(Number);

      // Position at center of grid
      dummy.position.x = (j - halfCols) * cellSize;
      dummy.position.y = (halfRows - i) * cellSize;
      dummy.position.z = 0;

      // Get animation data for this cell
      const anim = cellAnimations.current.get(key);
      if (anim) {
        dummy.scale.set(anim.scale, anim.scale, anim.scale);
        dummy.position.x += anim.jitter.x;
        dummy.position.y += anim.jitter.y;
        dummy.position.z += anim.jitter.z;
      } else {
        dummy.scale.set(1, 1, 1);
      }

      dummy.updateMatrix();
      instancedMeshRef.current.setMatrixAt(count, dummy.matrix);
      count++;
    });

    instancedMeshRef.current.count = count;
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  };

  // Update animations for each cell
  const updateCellAnimations = (delta) => {
    if (!instancedMeshRef.current) return;

    const animationSpeed = 5.0; // Speed of scale animation
    const jitterSpeed = 1.0; // Speed of jitter animation
    let needsUpdate = false;

    cellAnimations.current.forEach((anim, key) => {
      // Skip if not in current grid and animation is complete
      if (!grid.has(key) && Math.abs(anim.scale) < 0.01) {
        return;
      }

      // Update scale with easing
      if (Math.abs(anim.scale - anim.targetScale) > 0.01) {
        anim.scale += (anim.targetScale - anim.scale) * animationSpeed * delta;
        needsUpdate = true;
      }

      // Add subtle jitter for living cells
      if (grid.has(key) && anim.targetScale > 0.5) {
        anim.jitter.x = Math.sin(clockRef.current.elapsedTime * jitterSpeed + parseInt(key) * 0.1) * 0.03;
        anim.jitter.y = Math.cos(clockRef.current.elapsedTime * jitterSpeed + parseInt(key) * 0.2) * 0.03;
        anim.jitter.z = Math.sin(clockRef.current.elapsedTime * jitterSpeed * 1.5 + parseInt(key)) * 0.05;
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      updateInstancedMesh(grid);
    }
  };

  // Check if two grids are equal (used to detect stable patterns)
  const areGridsEqual = (gridA, gridB) => {
    if (gridA.size !== gridB.size) return false;

    for (const [key, _] of gridA) {
      if (!gridB.has(key)) return false;
    }

    return true;
  };

  // Start or pause the simulation
  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  // Reset the simulation with a new random grid
  const resetSimulation = () => {
    setIsRunning(false);
    populateRandomGrid();
  };

  // Run the simulation logic at regular intervals
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      calculateNextState();
    }, 1000 / speed);

    return () => clearInterval(intervalId);
  }, [isRunning, grid, prevGrid, generation, speed]);

  // Set up Three.js when showing simulation
  useEffect(() => {
    if (showSim) {
      const cleanup = initThree();

      // Initialize with random cells
      setTimeout(() => {
        populateRandomGrid();
      }, 100);

      return cleanup;
    }
  }, [showSim, gridSize, cellSize]);

  // Handle viewport resizing
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Spring animation for menu
  const menuAnimation = useSpring({
    opacity: showMenu ? 1 : 0,
    transform: showMenu ? 'scale(1)' : 'scale(0.8)',
    config: { tension: 300, friction: 20 },
  });

  // Spring animation for controls
  const controlsAnimation = useSpring({
    opacity: showSim && !resolved ? 1 : 0,
    height: showSim && !resolved ? 40 : 0,
    config: { tension: 300, friction: 20 },
  });

  // Spring animation for game over
  const gameOverAnimation = useSpring({
    opacity: resolved ? 1 : 0,
    transform: resolved ? 'scale(1)' : 'scale(0.8)',
    config: { tension: 300, friction: 20 },
  });

  // Handle grid size changes
  const handleGridSizeChange = (size) => {
    setGridSize(size);
    // Need to recreate the Three.js setup with new grid size
    if (showSim) {
      createInstancedMesh();
      populateRandomGrid();
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#070707',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {showMenu && !showSim && (
        <animated.div
          style={{
            ...menuAnimation,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            zIndex: 10
          }}
        >
          <h1 style={{ marginBottom: '10%' }}>Conway's Game of Life</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '75%' }}>
            <button
              onClick={() => {
                setShowMenu(false);
                setShowSim(true);
              }}
              style={buttonStyle}
            >
              Run Simulation
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
              <button
                onClick={() => handleGridSizeChange({ rows: 50, cols: 50 })}
                style={{ ...buttonStyle, flex: 1, backgroundColor: gridSize.rows === 50 ? '#2a6e5d' : '' }}
              >
                Small Grid
              </button>
              <button
                onClick={() => handleGridSizeChange({ rows: 100, cols: 100 })}
                style={{ ...buttonStyle, flex: 1, backgroundColor: gridSize.rows === 100 ? '#2a6e5d' : '' }}
              >
                Medium Grid
              </button>
              <button
                onClick={() => handleGridSizeChange({ rows: 200, cols: 200 })}
                style={{ ...buttonStyle, flex: 1, backgroundColor: gridSize.rows === 200 ? '#2a6e5d' : '' }}
              >
                Large Grid
              </button>
            </div>
          </div>
        </animated.div>
      )}

      {/* Controls for running simulation */}
      {showSim && (
        <animated.div
          style={{
            ...controlsAnimation,
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
            zIndex: 10,
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}
        >
          <div style={{ color: 'white', marginRight: '15px' }}>
            Generation: {generation}
          </div>
          <button
            onClick={toggleSimulation}
            style={buttonStyle}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetSimulation}
            style={buttonStyle}
          >
            Reset
          </button>
          <button
            onClick={() => {
              setShowSim(false);
              setShowMenu(true);
            }}
            style={buttonStyle}
          >
            Menu
          </button>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
            <label htmlFor="speed" style={{ color: 'white', marginRight: '8px' }}>Speed:</label>
            <input
              id="speed"
              type="range"
              min="1"
              max="30"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={{ width: '100px' }}
            />
          </div>
        </animated.div>
      )}

      {/* Game over overlay */}
      {resolved && (
        <animated.div
          style={{
            ...gameOverAnimation,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: '20px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 20
          }}
        >
          <h2 style={{ color: 'white', marginBottom: '20px' }}>
            Simulation Stabilized at Generation {generation}
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={resetSimulation}
              style={buttonStyle}
            >
              New Simulation
            </button>
            <button
              onClick={() => {
                setShowSim(false);
                setShowMenu(true);
                setResolved(false);
              }}
              style={buttonStyle}
            >
              Back to Menu
            </button>
          </div>
        </animated.div>
      )}
    </div>
  );
};`,

  "Readme.md":
`∙ Any live cell with fewer than two live neighbours succumbs to underpopulation and dies.
    ∙ Any live cell with two or three live neighbours flourishes, living on to the next generation.
    ∙ Any live cell burdened with more than three live neighbours falls to overpopulation and dies.
    ∙ Any dead cell that finds itself in the company of exactly three live neighbours springs to life, as if by reproduction.

    These rules can be condesnsed to better understand how we will incorperate them into our algorithm:
    ∙ Any live cell with two or three live neighbours will make it to the next grid generation
    ∙ Any dead cell with three live neighbours will come to life in next grid generation
    ∙ All other live cells die in the next generation
    `,
  },
};

export const CodeViewer = React.memo(({ activeFile = "Readme.md", app }) => {
  const code = codeBlocks[app][activeFile];
  const fontSize = useBreakpointValue({
    base: "1em",
    sm: "1em",
    md: "0.9em",
    lg: "0.9em",
    xl: "1em",
    xxl: "1.7em",
  });

  return (
    <CodeBlock
      theme={tomorrowNight}
      wrapLongLines={true}
      customStyle={{
        height: "100%",
        fontSize: fontSize,
        flex: "0.75",
        fontFamily: "Light",
        whiteSpace: "pre-wrap",
        backgroundColor: "rgb(28,28,28)",
      }}
      text={code || "No code to display yet."}
      language={activeFile === "Readme.md" ? "makefile" : "jsx"}
    />
  );
});
