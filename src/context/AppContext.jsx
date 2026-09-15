import React, { createContext, useContext, useMemo, useState } from "react";

const STORAGE_KEYS = {
  user: "rentroo-user",
  bookings: "rentroo-bookings",
};

const AppContext = createContext(null);

const readStorage = (key, fallback) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch {
    return fallback;
  }
};

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStorage(STORAGE_KEYS.user, null));
  const [bookings, setBookings] = useState(() => readStorage(STORAGE_KEYS.bookings, []));
  const [searchQuery, setSearchQuery] = useState("");
  const [showAgencyReg, setShowAgencyReg] = useState(false);

  const login = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.user);
  };

  const updateBookings = (nextBookings) => {
    setBookings(nextBookings);
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(nextBookings));
  };

  const value = useMemo(
    () => ({
      user,
      bookings,
      searchQuery,
      setSearchQuery,
      showAgencyReg,
      setShowAgencyReg,
      login,
      logout,
      setBookings: updateBookings,
    }),
    [user, bookings, searchQuery, showAgencyReg],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);