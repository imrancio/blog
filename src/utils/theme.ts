import { useState, useEffect } from 'react';

export const COLOR_PRIMARY = 'salmon';

export const CUBIC_BEZIER_TRANSITION = '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
export const EASE_IN_OUT_TRANSITION = '0.3s ease-in-out';
export const BACKGROUND_TRANSITION_TIME = '0.75s';

export interface ThemeInterface {
	background: string;
	color: string;
	secondary: string;
	muted: string;
	borderColor: string;
	borderHoverColor: string;
	chipColor: string;
	chipHoverColor: string;
}

/**
 * A hook to get and update the current theme for dark mode
 * @returns [theme, toggleTheme] - [current theme, function to toggle theme]
 */
export const useTheme = () => {
	let prefersTheme: string;
	if (typeof window !== 'undefined') {
		const storedTheme = window.localStorage.getItem('theme')
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		prefersTheme = storedTheme
      ? storedTheme
			: prefersDark
        ? 'dark'
				: 'light';
	} else {
		prefersTheme = 'light';
	}
	const [theme, setTheme] = useState(prefersTheme);
	const toggleTheme = () =>
		setTheme(prevTheme => {
			return prevTheme === 'light' ? 'dark' : 'light';
		});
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('theme', theme);
		}
	}, [theme]);
	return [theme, toggleTheme] as const;
};

export const getTheme = (theme: string): ThemeInterface =>
	theme === 'light'
		? {
				background: '#fff',
				color: 'hsla(0, 0%, 0%, 0.8)',
				secondary: 'hsla(0, 0%, 0%, 0.7)',
				muted: 'hsla(0, 0%, 0%, 0.6)',
				borderColor: '#eee',
				borderHoverColor: 'transparent',
				chipColor: 'rgba(0, 0, 0, 0.1)',
				chipHoverColor: 'rgba(0, 0, 0, 0.2)',
      }
		: {
				background: '#121212',
				color: 'hsla(0, 0%, 100%, 0.87)',
				secondary: 'hsla(0, 0%, 100%, 0.75)',
				muted: 'hsla(0, 0%, 100%, 0.60)',
				borderColor: 'hsla(0, 0%, 100%, 0.60)',
				borderHoverColor: COLOR_PRIMARY,
				chipColor: 'rgba(255, 255, 255, 0.1)',
				chipHoverColor: 'rgba(255, 255, 255, 0.2)',
      };
