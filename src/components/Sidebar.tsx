import React, { useContext } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { FiGithub, FiMail, FiLinkedin } from 'react-icons/fi';
import { FaAddressCard } from 'react-icons/fa';
import { mediaMax } from '@divyanshu013/media';

import Button from './Button';
import { rhythm } from '../utils/typography';
import { getTheme } from '../hooks/useTheme';
import { ThemeContext } from '../context/Theme';

const SIDEBAR_QUERY = graphql`
	query Sidebar {
		site {
			siteMetadata {
				author
				bio
				social {
					linkedin
					twitter
					github
					youtube
					email
					stackoverflow
					resume
				}
			}
		}
	}
`;

const Sidebar = () => {
	const data = useStaticQuery<Queries.SidebarQuery>(SIDEBAR_QUERY);
	const { author, bio, social } = data.site.siteMetadata;
	const { theme } = useContext(ThemeContext);
	const { muted } = getTheme(theme);
	const borderStartingColor = theme === 'light' ? 'hsla(0, 0%, 0%, 0.1)' : 'hsla(0, 0%, 100%, 0.1)';
	return (
		<nav
			css={{
				borderRight: '1px solid',
				margin: '24px 0',
				padding: '16px 64px',
				alignSelf: 'start',
				borderImage: `linear-gradient(to bottom, ${borderStartingColor}, hsla(0, 0%, 0%, 0)) 1 100%`,
				[mediaMax.large]: {
					borderBottom: '1px solid',
					borderImage: `linear-gradient(to right, ${borderStartingColor}, hsla(0, 0%, 0%, 0)) 1 100%`,
					borderImageSlice: 1,
					borderImageWidth: `0 0 1px 0`,
					padding: `16px 0 ${rhythm(2)} 0`,
					margin: '24px 32px',
				},
			}}
		>
			<div
				css={{
					[mediaMax.small]: {
						display: 'grid',
						gridTemplateColumns: 'auto auto',
						gridGap: 16,
						alignItems: 'center',
						justifyContent: 'start',
					},
				}}
			>
				<Link to="/about/">
					<StaticImage
						src="https://cdn.imranc.io/static/blog/profile-pic.png"
						alt={author}
						layout="fixed"
						placeholder="none"
						width={128}
						height={128}
						imgStyle={{ borderRadius: '50%' }}
						css={{
							marginBottom: rhythm(0.8),
							opacity: 0.87,
							[mediaMax.small]: {
								width: '64px !important',
								height: '64px !important',
								order: 1,
							},
						}}
					/>
				</Link>
				<h3>{author}</h3>
			</div>
			<p className="muted" css={{ color: muted }}>
				{bio}
			</p>
			<div
				css={{
					display: 'grid',
					gridGap: 16,
					gridTemplateColumns: 'repeat(4, auto)',
					justifyItems: 'center',
					justifyContent: 'start',
				}}
			>
				<OutboundLink
					href={social.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: 'inherit' }}
				>
					<Button className="no-highlights" aria-label="Link to my LinkedIn" as="a" circular>
						<FiLinkedin />
					</Button>
				</OutboundLink>
				<OutboundLink
					href={social.github}
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: 'inherit' }}
				>
					<Button className="no-highlights" aria-label="Link to my GitHub" as="a" circular>
						<FiGithub />
					</Button>
				</OutboundLink>
				<OutboundLink
					href={social.email}
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: 'inherit' }}
				>
					<Button className="no-highlights" aria-label="Email me" as="a" circular>
						<FiMail />
					</Button>
				</OutboundLink>
				<OutboundLink
					href={social.resume}
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: 'inherit' }}
				>
					<Button className="no-highlights" aria-label="Link to my Resume" as="a" circular>
						<FaAddressCard />
					</Button>
				</OutboundLink>
			</div>
		</nav>
	);
};

export default Sidebar;
