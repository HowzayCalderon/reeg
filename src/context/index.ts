import { createContext } from "react";

export const classContext = createContext<undefined | any>(undefined);

export const sessionContext = createContext<undefined | any>(null);

export const performanceContext = createContext<undefined | any>(null);