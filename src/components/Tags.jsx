import React, { useContext } from 'react';
import { array, bool } from 'prop-types';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import { FaTimes } from 'react-icons/fa';

import { getTheme, CUBIC_BEZIER_TRANSITION } from '../utils/theme';
import { rhythm } from '../utils/typography';
import ThemeContext from './ThemeContext';

const Tags = ({ list, cancel }) => {
	const { theme } = useContext(ThemeContext);
	const { muted } = getTheme(theme);
	return Array.isArray(list) && list.length ? (
		<div
			css={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
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
				{list
					.sort(
						(a, b) =>
							typeof a === 'string' && typeof b === 'string'
								? a.localeCompare(b) // sort alphabetically
								: b.totalCount - a.totalCount, // reverse sort by tag count
					) // sorted tags
					.map((item, index) => (
						<small
							key={index}
							css={{
								marginRight: rhythm(0.1),
								lineHeight: `2em`,
								backgroundColor: getTheme(theme).chipColor,
								padding: `0 12px`,
								borderRadius: `32px`,
								transition: CUBIC_BEZIER_TRANSITION,
								cursor: 'pointer',
								'&:hover, &:focus': { backgroundColor: getTheme(theme).chipHoverColor },
							}}
						>
							{typeof item === 'string' ? (
								<Link
									to={cancel ? `/tags/` : `/tags/${kebabCase(item)}/`}
									css={{ borderBottom: `none !important` }}
								>
									{item}
									{cancel && (
										<span css={{ lineHeight: `normal`, verticalAlign: `middle`, float: `right` }}>
											<FaTimes />
										</span>
									)}
								</Link>
							) : (
								<Link
									to={`/tags/${kebabCase(item.fieldValue)}/`}
									css={{ borderBottom: `none !important` }}
								>
									{item.fieldValue} ({item.totalCount})
								</Link>
							)}
						</small>
					))}
			</div>
		</div>
	) : null;
};

Tags.propTypes = {
	list: array,
	cancel: bool,
};

export default Tags;
