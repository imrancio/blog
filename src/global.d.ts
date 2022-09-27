declare const __PATH_PREFIX__: string;
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/** Node.js environment */
			NODE_ENV: 'development' | 'production' | 'test';
			/** Disable webpack bundle analyser during build */
			DISABLE_WEBPACK_ANALYSER: boolean;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
