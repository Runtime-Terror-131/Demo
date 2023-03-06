import React, { useState, createContext } from "react";

const userContext = createContext();
export function useContextValues() {
  return React.useContext(userContext);
}
export function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(1);
  const [portalNamePath, setPortalNamePath] = useState("/hopkins");
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [confirmDeletePatient, setConfirmDeletePatient] = useState(false);
  const updateUserType = (value) => {
    setUserType(value);
  };
  return (
    <userContext.Provider
      value={{
        userType,
        updateUserType,
        currentUser,
        setCurrentUser,
        portalNamePath,
        setPortalNamePath,
        loginErrorMessage,
        setLoginErrorMessage,
        patientDetails,
        setPatientDetails,
        showSpinner,
        setShowSpinner,
        showDeleteWarning,
        setShowDeleteWarning,
        confirmDeletePatient,
        setConfirmDeletePatient,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
