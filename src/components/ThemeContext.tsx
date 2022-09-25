import { createContext } from 'react';

export interface ThemeContextInterface {
  theme: string;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextInterface | null>(null);

export default ThemeContext;
