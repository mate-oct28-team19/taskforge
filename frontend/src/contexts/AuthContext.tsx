import { createContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setAuth: (auth: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: () => {},
});