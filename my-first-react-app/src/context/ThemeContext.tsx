import { BoltIcon } from "@heroicons/react/24/outline";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextProps {
  //darkTheme: boolean;
  darkTheme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
  //darkTheme: false,
  darkTheme: 'light',
  toggleTheme: () => {},
});

interface Props {
  children?: React.ReactNode;
}

interface Props {
  children?: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  //const [darkTheme, setDarkTheme] = useState(false);
  const [darkTheme, setDarkTheme] = useState('light');

  const localStorage = window.localStorage;

  useEffect(() => {
    const savedThemeLocal = localStorage.getItem("data-theme");

    if (!!savedThemeLocal) {
      setDarkTheme(savedThemeLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data-theme", darkTheme );
  }, [darkTheme]);

  const toggleThemeHandler = () => {
    //setDarkTheme((prevState) => !prevState);

    if (darkTheme === 'light') {
      setDarkTheme('dark')
    } else {
      setDarkTheme('light')
    }

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