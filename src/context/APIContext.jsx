import { createContext } from "react";

export const APIContext = createContext();

export default function APIProvider({ children }) {
  // const serverURL = "http://localhost:3000";
  const serverURL = "https://lol-mastery-backend.vercel.app";

  return (
    <APIContext.Provider value={{ serverURL }}>{children}</APIContext.Provider>
  );
}
