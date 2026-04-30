import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  fullName: string;
  email: string;
}

interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  register: (data: RegistrationData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USER_STORAGE_KEY = '@fiap-cantina:users';
const SESSION_STORAGE_KEY = '@fiap-cantina:session';

interface StoredUser extends UserProfile {
  password: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrapAuth() {
      try {
        const userJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
        const sessionJson = await AsyncStorage.getItem(SESSION_STORAGE_KEY);

        const users: StoredUser[] = userJson ? JSON.parse(userJson) : [];
        if (sessionJson) {
          const { email } = JSON.parse(sessionJson) as { email: string };
          const storedUser = users.find((item) => item.email === email);
          if (storedUser) {
            setUser({ fullName: storedUser.fullName, email: storedUser.email });
          }
        }
      } catch (error) {
        console.warn('Erro ao carregar sessão:', error);
      } finally {
        setLoading(false);
      }
    }

    bootstrapAuth();
  }, []);

  const persistSession = async (email: string) => {
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ email }));
  };

  const register = async ({ fullName, email, password }: RegistrationData) => {
    const existingUsersJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
    const existingUsers: StoredUser[] = existingUsersJson ? JSON.parse(existingUsersJson) : [];

    if (existingUsers.some((item) => item.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Este e-mail já está cadastrado. Faça login ou use outro e-mail.');
    }

    const newUser: StoredUser = { fullName: fullName.trim(), email: email.trim().toLowerCase(), password };
    const nextUsers = [...existingUsers, newUser];
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUsers));
    await persistSession(newUser.email);
    setUser({ fullName: newUser.fullName, email: newUser.email });
  };

  const login = async ({ email, password }: LoginData) => {
    const existingUsersJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
    const existingUsers: StoredUser[] = existingUsersJson ? JSON.parse(existingUsersJson) : [];
    const normalizedEmail = email.trim().toLowerCase();

    const storedUser = existingUsers.find((item) => item.email === normalizedEmail);
    if (!storedUser || storedUser.password !== password) {
      throw new Error('E-mail ou senha inválidos. Verifique seus dados e tente novamente.');
    }

    await persistSession(storedUser.email);
    setUser({ fullName: storedUser.fullName, email: storedUser.email });
  };

  const logout = async () => {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
