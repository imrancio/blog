import React, { useContext } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { StaticImage } from 'gatsby-plugin-image';

import { mediaMax } from '@divyanshu013/media';
import { rhythm } from '../utils/typography';
import { getTheme } from '../utils/theme';
import ThemeContext from './ThemeContext';

const BIO_QUERY = graphql`
	query Bio {
		site {
			siteMetadata {
				author
				social {
					github
					linkedin
				}
			}
		}
	}
`;

const Bio = () => {
	const data = useStaticQuery<Queries.BioQuery>(BIO_QUERY);

	const { author, social } = data.site.siteMetadata;
	const { theme } = useContext(ThemeContext);
	const { color, secondary } = getTheme(theme);
	return (
		<div
			css={{
				display: `grid`,
				gridTemplateColumns: 'auto auto',
				alignItems: 'start',
				a: {
					borderBottomColor: color,
					'&:hover, &:focus': {
						borderBottomStyle: 'solid',
						borderBottomColor: color,
					},
				},
				[mediaMax.small]: {
					gridTemplateColumns: 'auto',
				},
			}}
		>
			<Link to="/about/" style={{ borderBottom: 'none' }}>
				<StaticImage
					src="https://cdn.imranc.io/static/blog/profile-pic.png"
					alt={author}
					layout="fixed"
					placeholder="none"
					width={64}
					height={64}
					css={{
						marginTop: 8,
						marginRight: rhythm(1),
						borderRadius: `100%`,
						opacity: 0.87,
						[mediaMax.small]: {
							marginBottom: 8,
						},
						backgroundColor: `none`,
					}}
					imgStyle={{
						borderRadius: `50%`,
					}}
				/>
			</Link>
			<div css={{ fontSize: 16, color: secondary }}>
				<p>
					Personal blog of <OutboundLink href={social.linkedin}>{author}</OutboundLink>. I’m a{' '}
					<OutboundLink href={social.github}>software engineer</OutboundLink> currently working with{' '}
					<OutboundLink href="https://graphql.org/">GraphQL</OutboundLink>,{' '}
					<OutboundLink href="https://nestjs.com/">NestJS</OutboundLink>,{' '}
					<OutboundLink href="https://nodejs.org/en/">Node</OutboundLink>,{' '}
					<OutboundLink href="https://nextjs.org/">NextJS</OutboundLink>, and{' '}
					<OutboundLink href="https://reactjs.org/">React</OutboundLink>. I love learning about
					InfoSec, DevOps, ML, and Full Stack Web.
				</p>
			</div>
		</div>
	);
};

export default Bio;
