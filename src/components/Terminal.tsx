import React, { useContext } from 'react';
import { keyframes } from '@emotion/react';
import { FiTerminal } from 'react-icons/fi';

import { ThemeContext } from '../context/Theme';
import { getTheme } from '../hooks/useTheme';

const Terminal = (props) => {
	const { theme } = useContext(ThemeContext);
	const { color, background } = getTheme(theme);

	const terminalAnimation = keyframes({
		from: {
			stroke: color,
		},
		to: {
			stroke: background,
		},
	});

	return (
		<FiTerminal
			css={{
				marginRight: 8,
				line: {
					animation: `${terminalAnimation} 0.5s ease-in-out infinite`,
					animationDirection: 'alternate',
				},
			}}
			{...props}
		/>
	);
};

export default Terminal;
