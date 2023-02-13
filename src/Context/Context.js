import React, { useState, createContext } from "react";

const userContext = createContext();
export function useContextValues() {
  return React.useContext(userContext);
}
export function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(1);
  const updateUserType = (value) => {
    setUserType(value);
  };
  return (
    <userContext.Provider
      value={{ userType, updateUserType, currentUser, setCurrentUser }}
    >
      {children}
    </userContext.Provider>
  );
}
