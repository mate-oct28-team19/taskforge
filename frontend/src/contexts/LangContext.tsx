import React from "react";
import { Lang } from "../types/Lang";

type FuncType = React.Dispatch<React.SetStateAction<Lang>>;
const func: FuncType = () => {};

const defaultValue = {
  lang: 'ENGLISH' as Lang,
  setLang: func
}

export const LangContext = React.createContext(defaultValue);
