import React, { createContext, useEffect, useState } from 'react';
import { Global, css, ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import {
	useTheme,
	getTheme,
	CUBIC_BEZIER_TRANSITION,
	BACKGROUND_TRANSITION_TIME,
} from '../hooks/useTheme';
import PRISM_THEME_LIGHT from '../styles/prism-theme-light';
import PRISM_THEME_DARK from '../styles/prism-theme-dark';
import Search from '../components/Search';

export interface ThemeContextInterface {
	theme: string;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

export const ThemeProvider = ({ children }) => {
	const [theme, toggleTheme] = useTheme();
	const [key, forceUpdate] = useState(0);
	const currentTheme = getTheme(theme);
	const darkTheme = getTheme('dark');
	const { color } = currentTheme;
	useEffect(() => {
		forceUpdate(1);
		document.body.classList.remove('dark');
	}, []);
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<EmotionThemeProvider theme={currentTheme}>
				<Global
					styles={css({
						html: {
							scrollbarColor:
								theme === 'dark' ? `${darkTheme.muted} ${darkTheme.background}` : 'auto',
						},
						body: {
							// for rubber band effect in Chrome on MacOS and outside the scaled div with background color
							backgroundColor: currentTheme.background,
							// add transition delay only after initial rendering for continuing reading while maintaining
							// scroll position in dark mode on refresh
							transitionDelay: theme === 'dark' && key === 1 ? BACKGROUND_TRANSITION_TIME : '0s',
						},
						'body.dark': {
							'.container': {
								background: darkTheme.background,
								color: darkTheme.color,
							},
							'.muted': {
								color: darkTheme.muted,
							},
						},
						':root': { colorScheme: theme },
					})}
				/>
				<Global styles={css(theme === 'dark' ? PRISM_THEME_DARK : PRISM_THEME_LIGHT)} />
				<Global
					styles={css(`
						body.dark {
							${PRISM_THEME_DARK}
						}
				`)}
				/>
				<div
					className="container"
					css={{
						color,
						transition: CUBIC_BEZIER_TRANSITION,
						zIndex: 1,
						position: 'relative',
						overflow: 'hidden',
					}}
					key={key}
				>
					<Search>{children}</Search>
				</div>
			</EmotionThemeProvider>
		</ThemeContext.Provider>
	);
};
