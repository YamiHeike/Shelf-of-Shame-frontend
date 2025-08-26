import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
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
  const [user, setUser] = useState<UserDto | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  let logoutTimer: ReturnType<typeof setTimeout> | null;

  const login = (user: UserDto) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      logoutTimer = null;
    }

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  };

  const scheduleAutoLogout = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) return;

      if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = null;
      }

      const expiration = decoded.exp * 1000 - Date.now();
      if (expiration > 0) {
        logoutTimer = setTimeout(() => {
          logout();
        }, expiration);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
    }
  };

  useEffect(() => {
    if (user?.token) {
      scheduleAutoLogout(user.token);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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
