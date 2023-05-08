import { createContext } from "react";
import { AppContext } from "../types/AppContext";

export const UserContext = createContext<AppContext | null>(null);
