import React, { useMemo } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import type { UiState } from 'instantsearch.js';
import { history } from 'instantsearch.js/es/lib/routers';

const Search = ({ children }) => {
	const searchClient = useMemo(
		() => algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY),
		[],
	);
	const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME;
	return (
		<InstantSearch
			searchClient={searchClient}
			indexName={indexName}
			routing={{
				router: history(),
				stateMapping: {
					stateToRoute(uiState) {
						const indexUiState = uiState[indexName];
						return {
							query: indexUiState.query,
						} as UiState;
					},
					routeToState(routeState) {
						return {
							[indexName]: {
								query: routeState.query,
							},
						} as UiState;
					},
				},
			}}
		>
			{children}
		</InstantSearch>
	);
};

export default Search;
