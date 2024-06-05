import { createContext, useEffect, useState } from "react";
import { name_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext({});

const StoreContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || {}
  );

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const axiosins = axios.create({
    baseURL: "http://localhost:3500",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  });

  return (
    <StoreContext.Provider value={{ auth, setAuth, axiosins }}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
