"use client";

import { createContext, useEffect, useState } from "react";
export const globalContext = createContext();

const Context = ({ children }) => {
  const [city, setCity] = useState([]);
  const [travelData, setTravelData] = useState({}); 

  useEffect(() => {
    fetch("/api/city", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setCity(response.data);
      });
  }, []);

  const value = { city, setCity, travelData, setTravelData };

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
};

export default Context;
