import { useState } from "react";
import { createContext } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userLogin, setuserLogin] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
  );
  return (
    <UserContext.Provider value={{ userLogin, setuserLogin }}>
      {children}
    </UserContext.Provider>
  );
}
