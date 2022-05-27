# Imran C’s Blog

Personal blog of Imran Chowdhury

## About me

I’m a software engineer currently working with [Express](https://expressjs.com), [Vue](https://vuejs.org) and Node. I love learning about InfoSec, DevOps, ML, and Full Stack.

You may follow me on [LinkedIn](https://www.linkedin.com/in/imran-chowdhury-110865196/) for latest updates.

## Instructions

#### Prerequisites

- [nodejs](https://nodejs.org/en/download/package-manager/)
- [yarn](https://yarnpkg.com/getting-started/install)

First, install node dependencies:

```bash
yarn
```

For development server, run:

```bash
yarn develop # or yarn start
```

For production build, run:

```bash
yarn build # outputs to public/
```

For dockerised production build, run:

```bash
docker build -t imrancio/blog . # builds imrancio/blog:latest docker image
```

## Licenses

The source code is licensed under [MIT](./LICENSE-src). Please feel free to use and share it.

All rights reserved for the [content](./LICENSE-content). Its alright to share snippets or part of the content with proper attribution. It’s not okay to copy paste an entire post (with or without attribution). Please [contact me](mailto:imran@imranc.io) in this case.
