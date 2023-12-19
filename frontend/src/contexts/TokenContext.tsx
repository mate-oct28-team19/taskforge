import { createContext } from "react";

type TokenContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

export const TokenContext = createContext<TokenContextType>({
  token: '',
  setToken: () => {},
});