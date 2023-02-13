import React, { useState, createContext } from "react";

export const NavigationContext = createContext();

const NavigationContextProvider = ({ children }) => {
  const [page, setPage] = useState("home");

  const navigateToPage = (page) => {
    setPage(page);
  };

  const navigationState = {
    page,
    navigateToPage,
  };

  return (
    <NavigationContext.Provider value={navigationState}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContextProvider;
