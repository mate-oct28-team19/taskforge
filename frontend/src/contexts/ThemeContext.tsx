import React from "react";
import { Theme } from "../types/Theme";

type FuncType = React.Dispatch<React.SetStateAction<Theme>>;
const func: FuncType = () => {};

const defaultValue = {
  theme: 'LIGHT' as Theme,
  setTheme: func
}

export const ThemeContext = React.createContext(defaultValue);
