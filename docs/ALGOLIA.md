## Integrate Algolia Search

This blog application uses Algolia for instant search.

`gatsby-plugin-algolia` will build/update the blog content's Algolia search index during build of the Gatsby application.

`react-instantsearch` has various react components and hooks to integrate Algolia's search API into Gatsby application.

To be able to build/develop this blog application, you must first get Algolia credentials:

1. [Sign up](https://www.algolia.com/doc/guides/getting-started/quick-start/#sign-up-for-an-algolia-account) for a free Algolia account.
2. Once in the Algolia dashboard, create a new index and note the index name
3. From Algolia Settings -> API Keys, set the `*ALGOLIA*` environment variables in your terminal session
4. Run `yarn build` to upload blog content to Algolia search index
5. In Algolia dashboard -> Search -> Index -> Configuration, add Searchable attributes: `title`, `description`, `excerpt`
6. From above Configuration -> Snippets, add `excerpt` as Attribute to snippet at `50` maximum words
7. Run `yarn develop` to use search index via UI

### Environment variables

| env                         | description            |
| --------------------------- | ---------------------- |
| `GATSBY_ALGOLIA_APP_ID`     | Algolia application ID |
| `GATSBY_ALGOLIA_INDEX_NAME` | Algolia index name     |
| `GATSBY_ALGOLIA_SEARCH_KEY` | Algolia search key     |
| `ALGOLIA_ADMIN_KEY`         | Algolia admin key      |

> **Note**: `GATSBY_*` variables are safe to share and will be included in the built production files. Any other variables are private and only consumed during `gatsby build`.
