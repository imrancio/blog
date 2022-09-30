declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/** Node.js environment */
			NODE_ENV: 'development' | 'production' | 'test';
			/** Disable webpack bundle analyser during build */
			DISABLE_WEBPACK_ANALYSER: boolean;
			/** Algolia application ID */
			GATSBY_ALGOLIA_APP_ID: string;
			/** Algolia index name */
			GATSBY_ALGOLIA_INDEX_NAME: string;
			/** Algolia search key */
			GATSBY_ALGOLIA_SEARCH_KEY: string;
			/** Algolia admin key */
			ALGOLIA_ADMIN_KEY: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
