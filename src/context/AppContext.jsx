import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAgencyReg, setShowAgencyReg] = useState(false);

  return (
    <AppContext.Provider
      value={{ navigate, user: null, isOwner: false, showAgencyReg, setShowAgencyReg, searchQuery, setSearchQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);