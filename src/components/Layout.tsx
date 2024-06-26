import React, { ReactNode, useContext } from 'react';
import { Link } from 'gatsby';
import { mediaMax } from '@divyanshu013/media';
import { FiSun, FiMoon } from 'react-icons/fi';

import Terminal from './Terminal';
import Button from './Button';
import Footer from './Footer';
import { ThemeContext } from '../context/Theme';
import { rhythm } from '../utils/typography';
import { isIndexPage } from '../utils';
import { BACKGROUND_TRANSITION_TIME, EASE_IN_OUT_TRANSITION, getTheme } from '../hooks/useTheme';

type LayoutProps = {
	location: Location;
	children: ReactNode;
	title?: string;
};

const Layout = ({ location, children }: LayoutProps) => {
	const rootPath = `${__PATH_PREFIX__}/`;
	let header;
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { color, background, secondary } = getTheme(theme);
	const darkTheme = getTheme('dark');

	if (!isIndexPage(location.pathname, rootPath)) {
		header = (
			<h2
				style={{
					marginTop: 0,
				}}
			>
				<Link
					style={{
						boxShadow: `none`,
						textDecoration: `none`,
						color: `inherit`,
						display: 'inline-flex',
						alignItems: 'flex-end',
					}}
					to="/"
				>
					<Terminal /> Imran C’s Blog
				</Link>
			</h2>
		);
	}
	return (
		<div
			css={{
				marginLeft: isIndexPage(location.pathname, rootPath) ? 64 : `auto`,
				marginRight: isIndexPage(location.pathname, rootPath) ? 64 : `auto`,
				[mediaMax.small]: {
					marginLeft: 'auto',
					marginRight: 'auto',
				},
				maxWidth: rhythm(24),
				padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
				a: {
					color: 'inherit',
					textDecoration: 'none',
					transition: `border-color ${EASE_IN_OUT_TRANSITION}`,
					borderBottom: `1px dashed transparent`,
					'&:hover, &:focus': {
						borderBottomColor: color,
					},
				},
				blockquote: {
					color: secondary,
					borderColor: secondary,
					[mediaMax.small]: {
						marginLeft: rhythm(-12 / 16),
						marginRight: 0,
					},
				},
			}}
		>
			<header
				css={{
					display: 'flex',
					flexDirection: isIndexPage(location.pathname, rootPath) ? 'row-reverse' : 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				{header}
				<Button
					aria-label="Light and dark mode switch"
					circular
					onClick={toggleTheme}
					className="container no-highlights"
					css={{
						background,
						transitionDuration: '0s',
						// delay background-color transition for nicer animation
						transitionDelay: theme === 'dark' ? '0s' : BACKGROUND_TRANSITION_TIME,
						transitionProperty: 'background-color, color',
					}}
				>
					{theme === 'light' ? <FiSun /> : <FiMoon />}
					<div
						className={theme}
						css={{
							position: 'absolute',
							background: darkTheme.background,
							borderRadius: '50%',
							width: 32,
							height: 32,
							zIndex: -1,
							transition: `transform ${BACKGROUND_TRANSITION_TIME} ease`,
							'&.dark': {
								transform: 'scale(150)',
							},
						}}
					/>
				</Button>
			</header>
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
