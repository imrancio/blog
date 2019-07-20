import React from 'react';
import { Link } from 'gatsby';

import { node, object, string } from 'prop-types';
import { rhythm } from '../utils/typography';

const Layout = ({ location, title, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`;
	let header;

	if (location.pathname === rootPath) {
		header = (
			<h3
				style={{
					marginBottom: rhythm(1.5),
					marginTop: 0,
				}}
			>
				Recent posts
			</h3>
		);
	} else {
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
					}}
					to="/"
				>
					{title}
				</Link>
			</h2>
		);
	}
	return (
		<div
			style={{
				marginLeft: location.pathname === rootPath ? 64 : `auto`,
				marginRight: 0,
				maxWidth: rhythm(24),
				padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
			}}
		>
			<header>{header}</header>
			<main>{children}</main>
			<footer style={{ fontStyle: 'italic' }}>
				Follow me on <a href="https://twitter.com/divyanshu013">twitter</a> for updates
			</footer>
		</div>
	);
};

Layout.propTypes = {
	location: object.isRequired,
	title: string.isRequired,
	children: node.isRequired,
};

export default Layout;
