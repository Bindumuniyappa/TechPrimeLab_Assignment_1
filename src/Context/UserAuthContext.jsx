import { createContext, useState } from "react";

export const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  let storedMessage = localStorage.getItem("msg");
  const [isLoggedIn, setIsLoggedIn] = useState(storedMessage ? true : false);

  const loginUser = (message) => {
    setIsLoggedIn(true);
  }

  const logoutUser = () => {
    localStorage.removeItem("msg");
    setIsLoggedIn(false);
  }

  return (
    <UserAuthContext.Provider value={{ isLoggedIn, loginUser, logoutUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};