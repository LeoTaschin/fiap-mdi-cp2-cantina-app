import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MenuItem, MENU_ITEMS } from '@/constants/menu';

export interface CartItem {
  id: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}

interface AppDataContextValue {
  cart: CartItem[];
  orders: Order[];
  favorites: string[];
  loading: boolean;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  placeOrder: () => void;
  toggleFavorite: (itemId: string) => void;
  clearCart: () => void;
  cartQuantity: number;
  cartTotal: number;
  isFavorite: (itemId: string) => boolean;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);
const APP_DATA_KEY = '@fiap-cantina:app-data';

interface StoredAppData {
  cart: CartItem[];
  orders: Order[];
  favorites: string[];
}

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAppData() {
      try {
        const storedData = await AsyncStorage.getItem(APP_DATA_KEY);
        if (storedData) {
          const parsed: StoredAppData = JSON.parse(storedData);
          setCart(parsed.cart ?? []);
          setOrders(parsed.orders ?? []);
          setFavorites(parsed.favorites ?? []);
        }
      } catch (error) {
        console.warn('Erro ao carregar dados do aplicativo:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAppData();
  }, []);

  useEffect(() => {
    async function persistData() {
      try {
        await AsyncStorage.setItem(
          APP_DATA_KEY,
          JSON.stringify({ cart, orders, favorites }),
        );
      } catch (error) {
        console.warn('Erro ao salvar dados do aplicativo:', error);
      }
    }

    if (!loading) {
      persistData();
    }
  }, [cart, orders, favorites, loading]);

  const addToCart = (itemId: string) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === itemId);
      if (existing) {
        return previous.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...previous, { id: itemId, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((previous) => previous.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      return;
    }

    const total = cart.reduce((sum, item) => {
      const menuItem = MENU_ITEMS.find((menu) => menu.id === item.id);
      return sum + (menuItem?.price ?? 0) * item.quantity;
    }, 0);

    const newOrder: Order = {
      id: `${Date.now()}`,
      items: cart,
      total,
      createdAt: new Date().toISOString(),
    };

    setOrders((previous) => [newOrder, ...previous]);
    setCart([]);
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites((previous) =>
      previous.includes(itemId)
        ? previous.filter((id) => id !== itemId)
        : [...previous, itemId],
    );
  };

  const isFavorite = (itemId: string) => favorites.includes(itemId);

  const cartQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const menuItem = MENU_ITEMS.find((menu) => menu.id === item.id);
        return sum + (menuItem?.price ?? 0) * item.quantity;
      }, 0),
    [cart],
  );

  return (
    <AppDataContext.Provider
      value={{
        cart,
        orders,
        favorites,
        loading,
        addToCart,
        removeFromCart,
        placeOrder,
        toggleFavorite,
        clearCart,
        cartQuantity,
        cartTotal,
        isFavorite,
      }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
