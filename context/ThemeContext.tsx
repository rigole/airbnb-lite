import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { darkColors, lightColors, ThemeColors } from "../constants/colors";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeOverride = "system" | "light" | "dark";

type ThemeContextType = {
  colors: ThemeColors;
  isDark: boolean;
  override: ThemeOverride;
  setOverride: (value: ThemeOverride) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const STORAGE_KEY = "theme-override";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [override, setOverrideState] = useState<ThemeOverride>("system");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved === "light" || saved === "dark" || saved === "system") {
        setOverrideState(saved);
      }
    });
  }, []);

  const setOverride = (value: ThemeOverride) => {
    setOverrideState(value);
    AsyncStorage.setItem(STORAGE_KEY, value);
  };

  const isDark =
    override === "system" ? systemScheme === "dark" : override === "dark";

  const colors = (isDark ? darkColors : lightColors) as ThemeColors;

  return (
    <ThemeContext.Provider value={{ colors, isDark, override, setOverride }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThme must be used with a themeprovider");
  }
  return context;
}
