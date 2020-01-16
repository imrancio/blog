import React, { useContext } from 'react';
import { array } from 'prop-types';

import { getTheme, CUBIC_BEZIER_TRANSITION } from '../utils/theme';
import { rhythm } from '../utils/typography';
import ThemeContext from './ThemeContext';

const Tags = ({ list }) => {
	const { theme } = useContext(ThemeContext);
	const { muted } = getTheme(theme);
	return Array.isArray(list) && list.length ? (
		<div
			className="muted"
			css={{
				display: 'flex',
				alignItems: 'center',
				color: muted,
				marginTop: rhythm(-3 / 4),
				marginBottom: rhythm(1),
				flexWrap: 'wrap',
				'*': {
					marginTop: rhythm(0.1),
				},
			}}
		>
			{list.map((item, index) => (
				<small
					key={index}
					css={{
						display: 'inline-block',
						marginRight: rhythm(0.1),
						height: `2em`,
						lineHeight: `2em`,
						backgroundColor: getTheme(theme).chipColor,
						padding: `0 12px`,
						borderRadius: `32px`,
						transition: CUBIC_BEZIER_TRANSITION,
						// fontSize: `1em`,
						'&:hover': { backgroundColor: getTheme(theme).chipHoverColor },
					}}
				>
					{item}
				</small>
			))}
		</div>
	) : null;
};

Tags.propTypes = {
	list: array.isRequired,
};

export default Tags;
