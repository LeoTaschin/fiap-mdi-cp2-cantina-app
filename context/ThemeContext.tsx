import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { DefaultTheme, DarkTheme, ThemeProvider as NavigationThemeProvider, Theme } from '@react-navigation/native';
import { Colors } from '@/constants/theme';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => Promise<void>;
  colors: typeof Colors.light;
  navTheme: Theme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const THEME_STORAGE_KEY = '@fiap-cantina:theme-preference';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useSystemColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>(systemTheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    async function loadThemePreference() {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setThemeState(savedTheme);
        }
      } catch (error) {
        console.warn('Erro ao carregar preferência de tema:', error);
      }
    }

    loadThemePreference();
  }, []);

  const setTheme = async (mode: ThemeMode) => {
    setThemeState(mode);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.warn('Erro ao salvar preferência de tema:', error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navTheme = useMemo(() => {
    const palette = theme === 'dark' ? Colors.dark : Colors.light;
    return {
      ...(theme === 'dark' ? DarkTheme : DefaultTheme),
      colors: {
        ...(theme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
        primary: palette.primary,
        background: palette.background,
        card: palette.cardBackground,
        text: palette.text,
        border: palette.border,
        notification: palette.secondary,
      },
    };
  }, [theme]);

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      colors: theme === 'dark' ? Colors.dark : Colors.light,
      navTheme,
    }),
    [theme, navTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <NavigationThemeProvider value={navTheme}>{children}</NavigationThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
