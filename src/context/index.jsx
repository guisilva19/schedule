import { createContext, useState } from "react";
export const userContext = createContext();

export const Provider = ({ children }) => {
  const [user, setUser] = useState();

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
