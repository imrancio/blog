import React, { useContext } from 'react';

import { getTheme } from '../utils/theme';
import ThemeContext from './ThemeContext';
import Coffee from './Coffee';

type BlogInfoProps = {
	timeToRead: number;
	date: string;
}

const BlogInfo = ({ timeToRead, date }: BlogInfoProps) => {
	const { theme } = useContext(ThemeContext);
	const { muted } = getTheme(theme);
	return (
		<div css={{ display: 'flex', alignItems: 'center', color: muted }}>
			<small css={{ marginRight: 4 }}>
				{date} • {timeToRead} min read
			</small>
			{Array.from({ length: timeToRead / 7 + 1 }).map((item, index) => (
				<Coffee key={index} />
			))}
		</div>
	);
};

export default BlogInfo;
