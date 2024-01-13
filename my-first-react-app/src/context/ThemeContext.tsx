import React, { createContext, useContext, useState } from "react";

interface ContextProps {
  darkTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
  darkTheme: false,
  toggleTheme: () => {},
});

interface Props {
  children?: React.ReactNode;
}

interface Props {
  children?: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleThemeHandler = () => {
    setDarkTheme((prevState) => !prevState);
    //document.documentElement.classList.toggle('dark')
  };

  return (
    <ThemeContext.Provider
      value={{
        darkTheme: darkTheme,
        toggleTheme: toggleThemeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

//export const useTheme = () => useContext()