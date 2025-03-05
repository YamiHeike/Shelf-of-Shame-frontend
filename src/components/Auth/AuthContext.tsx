import { createContext, useContext, useState } from "react";
import { UserDto } from "./AuthTypes";

type AuthContextType = {
  user: UserDto | null;
  isAuthenticated: boolean;
  login: (user: UserDto) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const isAuthenticated = !!user;

  const login = (user: UserDto) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
