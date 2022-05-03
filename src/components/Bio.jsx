import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { GatsbyImage } from "gatsby-plugin-image";

import { mediaMax } from '@divyanshu013/media';
import { rhythm } from '../utils/typography';
import { getTheme } from '../utils/theme';
import ThemeContext from './ThemeContext';

const Bio = () => {
	const data = useStaticQuery(graphql`query BioQuery {
  avatar: file(absolutePath: {regex: "/profile-pic.png/"}) {
    childImageSharp {
      gatsbyImageData(width: 64, height: 64, layout: FIXED)
    }
  }
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
`);

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
			<GatsbyImage
                image={data.avatar.childImageSharp.gatsbyImageData}
                alt={author}
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
				}} />
			<div css={{ fontSize: 16, color: secondary }}>
				<p>
					Personal blog of <OutboundLink href={social.linkedin}>{author}</OutboundLink>. I’m a{' '}
					<OutboundLink href={social.github}>software engineer</OutboundLink> currently working with{' '}
					<OutboundLink href="https://expressjs.com/">Express</OutboundLink>,{' '}
					<OutboundLink href="https://vuejs.org/">Vue</OutboundLink> and Node. I love learning about
					InfoSec, DevOps, ML, and Full Stack.
				</p>
			</div>
		</div>
    );
};

export default Bio;
