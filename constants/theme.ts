/**
 * FIAP Checkpoint Tracker - Design System
 * 
 * Design Philosophy: Corporate Minimalism with FIAP Identity
 * Paleta de cores extraída do site oficial da FIAP
 * - Rosa/Magenta FIAP (#E91E63) como cor primária
 * - Cinza Escuro (#1a1a1a) para backgrounds
 * - Branco (#FFFFFF) para texto principal
 * - Cinza Médio (#666666) para texto secundário
 */

import { Platform } from 'react-native';

// FIAP Brand Colors - Extracted from fiap.com.br
const FIAP_MAGENTA = '#E91E63';
const FIAP_DARK_BG = '#1a1a1a';
const FIAP_WHITE = '#FFFFFF';
const FIAP_GRAY_MEDIUM = '#666666';
const FIAP_GRAY_LIGHT = '#f5f5f5';

export const Colors = {
  light: {
    text: FIAP_DARK_BG,
    background: FIAP_WHITE,
    tint: FIAP_MAGENTA,
    icon: FIAP_GRAY_MEDIUM,
    tabIconDefault: FIAP_GRAY_MEDIUM,
    tabIconSelected: FIAP_MAGENTA,
    primary: FIAP_MAGENTA,
    secondary: '#FF6B9D',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    border: '#E0E0E0',
    cardBackground: FIAP_WHITE,
    cardBorder: '#E0E0E0',
  },
  dark: {
    text: FIAP_WHITE,
    background: FIAP_DARK_BG,
    tint: FIAP_MAGENTA,
    icon: FIAP_GRAY_MEDIUM,
    tabIconDefault: FIAP_GRAY_MEDIUM,
    tabIconSelected: FIAP_MAGENTA,
    primary: FIAP_MAGENTA,
    secondary: '#FF6B9D',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    border: '#333333',
    cardBackground: '#2a2a2a',
    cardBorder: '#333333',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Typography Sizes
export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
};

// Border Radius
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};
