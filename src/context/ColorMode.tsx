import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";

interface ColorModeContextProviderType {
  children: React.ReactNode;
}

interface ColorModeContextType {
  colorMode: {
    toggleColorMode: () => void;
  };
  mode: "light" | "dark";
}

const ColorModeContext = createContext({
  colorMode: {
    toggleColorMode: () => {},
  },
  mode: "light",
} as ColorModeContextType);

export const ColorModeContextProvider = ({
  children,
}: ColorModeContextProviderType) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: {
          main: "#2C3E40",
        },
        secondary: {
          main: "#A6A6A6",
        },
      },
    });
  }, [mode]);

  const value = {
    colorMode,
    mode,
  };

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
