module.exports = {
	siteMetadata: {
		bio: 'Life, music, code and things in between…',
		title: `Imran Chowdhury`,
		author: `Imran Chowdhury`,
		description: `Personal blog of Imran Chowdhury`,
		siteUrl: `https://imranc.io`,
		social: {
			linkedin: `https://www.linkedin.com/in/imran-chowdhury-110865196/`,
			twitter: `https://twitter.com/imrancio`,
			github: 'https://github.com/imrancio',
			youtube: 'https://youtube.com/Imran51408s',
			email: 'mailto:imran@imranc.io',
			stackoverflow: 'https://stackoverflow.com/users/12705130/imran-chowdhury',
		},
	},
	plugins: [
		`gatsby-plugin-emotion`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/blog`,
				name: `blog`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					{
						resolve: `gatsby-remark-autolink-headers`,
						options: {
							icon: ``,
						},
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
					`gatsby-remark-external-links`,
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-feed`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Imran C’s Blog`,
				short_name: `Imran`,
				start_url: `/`,
				background_color: `#121212`,
				theme_color: `#1d1d1d`,
				display: `minimal-ui`,
				icon: `static/favicon.png`,
			},
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`,
			},
		},
		{
			resolve: `gatsby-plugin-nprogress`,
			options: {
				color: `salmon`,
			},
		},
		{
			resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
			options: {
				devMode: false,
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-54730700-3',
				head: false,
				anonymize: true,
				respectDNT: true,
			},
		},
		'gatsby-plugin-catch-links',
		{
			resolve: 'gatsby-plugin-page-progress',
			options: {
				includePaths: [{ regex: '^/blog' }],
				height: 3,
				prependToBody: false,
				color: `salmon`,
			},
		},
	],
};
