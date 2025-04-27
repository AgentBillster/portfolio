import React, { useRef, useState, useEffect } from "react";
import { View, useMediaQuery } from "native-base";

import { TaskScreen } from "./screens/TaskScreen";
import { TimerScreen } from "./screens/TimerScreen";
import { breakpoints } from "../../../theme";
import { SplashScreen } from "../../components(native)/SplashScreen";
import { Onboarding } from "../../components(native)/Onboarding";
import pomo from "../../../assets/lottie/pomo.json";

// initial task Data
const initialData = [
  {
    title: "Todo",
    data: [
      {
        task: "Redesign Portfolio",
        vibrate: true,
        interlude: 10,
        intervals: 7,
        timestamp: new Date().getTime() - 60000,
      },
    ],
  },
  {
    title: "Archived",
    data: [
      {
        task: "Work on Resume",
        vibrate: true,
        interlude: 2,
        intervals: 6,
        timestamp: 1683074782699,
        touched: {
          completed: true,
          total: 1241244,
          resumeFromInterval: 6,
        },
      },
      {
        task: "Do a Long Task",
        vibrate: true,
        interlude: 3,
        intervals: 5,
        timestamp: 1682460382699,
        touched: {
          completed: true,
          total: 129529,
          resumeFromInterval: 5,
        },
      },
    ],
  },
];

const Pomodoro = React.memo(({ closeApp, viewCode }) => {
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
    localStorage.clear();
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
});

export default Pomodoro;
