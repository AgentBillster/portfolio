import { useLottie } from "lottie-react";
import { Center, PresenceTransition, Text } from "native-base";
import { useEffect, useState } from "react";

export const SplashScreen = ({ anim, app }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(false);
    }, 4200);
    return () => clearTimeout(timeoutId);
  }, []);

  const Splash = () => {
    const { View } = useLottie({
      animationData: anim,
      loop: true,
    });
    return View;
  };

  return (
    <PresenceTransition
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        zIndex: 1,
        borderRadius: "20px",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      visible={show}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <Center flex={1} bg="black">
        <Text fontFamily={"Light"} fontSize={"2em"}>
          {app}
        </Text>
        <Splash />
      </Center>
    </PresenceTransition>
  );
};
