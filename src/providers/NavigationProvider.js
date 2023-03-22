import React from "react";
import { usePageNavigation } from "./../hooks/usePageNavigation";
import HomeScreen from "./../screens/HomeScreen";
import WorkScreen from "./../screens/WorkScreen";
import ContactScreen from "./../screens/ContactScreen";
import DemoScreen from "./../screens/DemoScreen";

export const NavContext = React.createContext({});

export const NavigationProvider = (props) => {
  
  const { navigate, transitions, getPage, currentPage } =
    usePageNavigation(pages);


  const pages = {
    home: ({ style }) => <HomeScreen style={style} />,
    work: ({ style }) => <WorkScreen style={style} />,
    contact: ({ style }) => <ContactScreen style={style} />,
    demo: ({ style, data }) => <DemoScreen style={style} data={data} />,
  };

  return (
    <NavContext.Provider
      value={{ navigate, transitions, getPage, pages, currentPage }}
    >
      {props.children}
    </NavContext.Provider>
  );
};
