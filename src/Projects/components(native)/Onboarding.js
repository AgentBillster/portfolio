import { Center, Pressable, ScrollView, Text, VStack, View } from "native-base";
import { useRef } from "react";
import useMeasure from "react-use-measure";
import Lottie from "lottie-react";
import tea from "../../assets/lottie/tea.json";
import dudefloating from "../../assets/lottie/dudefloating.json";
import mato from "../../assets/lottie/mato.json";

const data = [
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
