# Imran C’s Blog

<p>
  <a href="https://github.com/imrancio/blog/actions" target="blank">
	  <img src="https://github.com/imrancio/blog/actions/workflows/docker-publish.yml/badge.svg" alt="docker workflow" />
	</a>
	<a href="https://www.paypal.com/donate/?business=57FBUW2NMP56G&no_recurring=0&currency_code=AUD" target="blank">
	  <img src="https://img.shields.io/badge/Donate-PayPal-green.svg" alt="donate" />
	</a>
</p>

Personal blog of Imran Chowdhury

## About me

I’m a software engineer currently working with [NextJS](https://nextjs.org/), [React](https://reactjs.org/), [NestJS](https://nestjs.com/), [Node](https://nodejs.org/en/), and [GraphQL](https://graphql.org/). I love learning about InfoSec, DevOps, ML, and Full Stack Web.

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

For deploy to AWS S3, run:

```bash
AWS_PROFILE=<aws profile name> yarn deploy
# or AWS_ACCESS_KEY_ID=<...> AWS_SECRET_ACCESS_KEY=<...> AWS_REGION<...> yarn deploy
```

## Licenses

The source code is licensed under [MIT](./LICENSE-src). Please feel free to use and share it.

All rights reserved for the content. It's alright to share snippets or part of the content with proper attribution. It’s not okay to copy paste an entire post (with or without attribution). Please [contact me](mailto:imran@imranc.io) in this case.
