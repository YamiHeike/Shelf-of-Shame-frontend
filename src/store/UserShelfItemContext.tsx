import { createContext, useContext } from "react";
import { UserShelfItemRecord } from "../types";

const UserShelfItemContext = createContext<UserShelfItemRecord | null>(null);

type UserShelfItemContextProviderProps = {
  children: React.ReactNode;
  item: UserShelfItemRecord;
};

export const UserShelfItemContextProvider = ({
  item,
  children,
}: UserShelfItemContextProviderProps) => {
  return (
    <UserShelfItemContext.Provider value={item}>
      {children}
    </UserShelfItemContext.Provider>
  );
};

export const useUserShelfItemContext = () => {
  const ctx = useContext(UserShelfItemContext);
  if (!ctx) {
    throw new Error(
      "useUserShelfItemContext can be used only within UserShelfItemContextProvider with a valid UserShelfItemContextType value"
    );
  }
  return ctx;
};
