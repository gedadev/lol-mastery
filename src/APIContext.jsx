import { createContext } from "react";

export const APIContext = createContext();

export default function APIProvider({ children }) {
  const serverURL = "https://lol-mastery-backend.onrender.com";

  return (
    <APIContext.Provider value={{ serverURL }}>{children}</APIContext.Provider>
  );
}
