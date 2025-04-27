import React, { useState } from "react";
import { useColorMode, HStack, useMediaQuery, View } from "native-base";
import { NavBar } from "./navigators/NavBar";
import HomeScreen from "./screens/HomeScreen";
import WorkScreen from "./screens/WorkScreen";
import ContactScreen from "./screens/ContactScreen";
import { DemoScreen } from "./screens/DemoScreen";
import { breakpoints } from "./theme";
import { Title } from "./components/Title";

const App = () => {
  const [demoData, setDemoData] = useState();
  const { colorMode } = useColorMode();

  const [currentPage, setCurrentPage] = useState("work");
  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });
  const [LargerThanPhone] = useMediaQuery({ minWidth: breakpoints.md + 1 });

  const navigate = (page, data) => {
    setDemoData(data || null);
    setCurrentPage(page);
  };

  const pages = {
    home: <HomeScreen />,
    work: <WorkScreen navigate={navigate} />,
    demo: <DemoScreen navigate={navigate} data={demoData && demoData} />,
    contact: <ContactScreen />,
  };

  return (
    <HStack
      w={isMobile ? "100%" : "88%"}
      h={isMobile ? "100%" : "84%"}
      borderRadius={!isMobile && !demoData && "8px"}
      borderColor={"muted.400"}
      borderWidth={!demoData && window.innerWidth > 600 && "1"}
      style={{
        boxShadow:
          !isMobile &&
          !demoData &&
          `0px 0px 40px 0px ${colorMode === "light" ? "rgba(0,0,0,0.10)" : "rgba(150,150,150,0.1)"
          }, -3px 52px 49px -41px ${colorMode === "light" ? "rgba(0,0,0,0.10)" : "rgba(150,150,150,0.1)"
          }`,
      }}
      overflowX={"hidden"}
    >
      {!demoData && (
        <NavBar pages={pages} navigate={navigate} currentPage={currentPage} />
      )}
      <View flex="1"> {pages[currentPage]}</View>
      {LargerThanPhone && (
        <Title demoData={demoData} currentPage={currentPage} />
      )}
    </HStack>
  );
};

export default App;
