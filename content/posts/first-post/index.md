---
title: 'First Blog Post'
date: 2020-01-17
description: 'This is the first official blog post detailing the development of this static blog site'
tags: ['Gatsby', 'React', 'GraphQL', 'software', 'web', 'markdown', 'design']
---

## Intro

I was recently interested in creating my own blog site after realising the benefits of documenting software development for my own reference and for others as well.

The main features I was interested in were:

1. Clean, minimalist design adhering to [Material Design](https://material.io/design/) guidelines
2. Generate posts from `markdown` files so I can reference code blocks and a host of other elements with very little markup
   - Syntax highlighting for code blocks
   - GitHub styled markdown header links
3. Scrolling progress-bar for blog posts I had seen in other blog sites
4. Ability to toggle light/dark themes with good contrast for both color schemes
   - theme should apply to most elements on-screen, including code blocks
5. Tagging posts with keywords and filtering by keywords

> tl;dr - I found an [open-source](https://github.com/divyanshu013/blog) blog site generator that had most of the features I was looking for, with beautiful design aesthetics.
>
> So I forked the repo and added some features to it. Read along to learn more...

My friend Stuart frequently told me about [Jekyll](https://jekyllrb.com/) as he shamelessly plugged his site, [SigSec](https://blog.sigsec.net/). He also told me he's moving to [GatsbyJS](https://www.gatsbyjs.org/) which is developed with more modern web technologies.

They are both **static site generators**. The idea is, you provide some content, such as blog posts in the form of `markdown` files, and it will generate a static site for you with all your content. They allow styling the layout and presentation of your content as you see fit.

## Getting Familiar with GatsbyJS

Gatsby uses many different technologies under the hood, but I'd like to focus on **React** and **GraphQL**.

### React

_[React](https://reactjs.org/)_ is an amazing frontend framework for creating user interfaces as it allows you to focus on individual component design. I already had some familiarity with this, so I won't go too much in detail.

Basically, React is what Gatsby uses to style your pages and your layouts and link them together in a responsive way. The end result is you usually never have to wait for page loads as React loads all the content once and only changes components on-screen as you navigate around the site. This leads to a much more immersive user experience than a site that requests and loads each individual page separately.

### GraphQL

_[GraphQL](https://graphql.org/)_ is a query language designed to source data from your [API](https://en.wikipedia.org/wiki/Application_programming_interface). It is similar to something called a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API. They are both a set of defined rules that allow fetching data from web servers in a consistent and predictable manner.

#### GraphQL vs REST APIs

![Rest](https://files.imranc.io/static/blog/posts/first-post/graphql.svg 'GraphQL')

_REST_ APIs are quite common, and I have been using them for my backend Express.js servers for some time now. I had to learn about _GraphQL_ as it's used by Gatsby to fetch data from many different sources, including CMSs, Markdown, APIs, databases, etc.

GraphQL was developed specifically to solve certain problems introduced by REST APIs. Mainly, REST APIs use routes to determine data requirements for requests. There are certain guidelines for these routes, such as `GET /users` will return all user resources, and `GET /users/1` will return user with ID 1, etc. However, this structure does not consider all data requirements for every use-case of the frontend. As such, the client will needlessly _overfetch_ or _underfetch_ data from the web server according to different frontend views. Furthermore, fetching multiple resources requires multiple requests to different endpoint routes.

GraphQL solves this problem by fetching exactly the data requested in the form of a `POST` request. The `POST` request contains a JSON object encapsulating the exact data requirements of the request, which is then sent back by the server in a standard JSON form. The query language can request multiple fields from multiple resources and also apply mutations in a _single request_, i.e.

```graphql
query {
	site {
		siteMetadata {
			title
			description
		}
	}
	user(id: "1") {
		name
		height(unit: FOOT)
	}
}
```

## Developing a Blog Site Generator

The first three [features](#intro) I wanted are quite simple to get started with, as Gatsby documentation includes [tutorials](https://www.gatsbyjs.org/tutorial/) for this common blog site generator use-case. It's quite easy to follow along and their website featured many of the clean design aesthetics I was after, including light/dark theme support, beautiful font and colors for text and code blocks, etc. They are using their own technology to power the content in their site as well, so it was good for design inspiration.

The Gatsby documentation also includes many [starters](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/) to get your blog site generator going and I initially used one with Material design to get my blog started. However, I soon realised that light/dark theme support required extensive code redesign for these starter blogs, which felt cumbersome to me as I was getting familiar with so many new technologies at once. Also, it has been a while since I did frontend work using React, as I've been mainly using [Vue.js](https://vue.org) for frontend design at work.

I then found a few blog posts that were quite helpful in figuring out how to add dark mode support for GatsbyJS sites. His blog site already had most of the features I wanted and he was kind enough to make the code open-source, and I absolutely loved his design choices. Basically, it would've taken me weeks to get my blog to look this good with my subpar design skills. So, I forked the code and began hacking away.

## Adding Features

I cleaned up the design a bit to be more consistent on Safari browsers. The site already had a _[responsive UI](https://material.io/design/layout/responsive-layout-grid.html#columns-gutters-margins)_, so I didn't mess with the layouts too much. The colors and fonts were clean and beautiful, both for text and `code` blocks, so I tried to follow them for any new elements I was adding or styling.

I added the **scrolling progress-bar** for my blog posts, which was dead simple to do with a plugin. I also added GitHub styled **[header links](#graphql)** for all headers in my blog posts using another plugin. And **unicode emoji support** with yet another plugin because they're just fun :wink:.

Finally, I implemented **tagging posts by keywords** and **filtering posts by [tags](/tags/)**, which is also straightforward to do by following a Gatsby [tutorial](https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/). You may click any of the tags below the blog post title and it will show you all posts related to that tag.

## Gatsby Plugins

Another thing that drew me to GatsbyJS is their extensive plugin library. They have a plugin for most things you would want to do with a blog site. The only problem is, while some of these plugins are helpful to add features quickly, many of them are quite restrictive if you want to customise any aspects of the plugin that are not included in the plugin options.

The plugins I found most useful are plug-and-play and should work with any Gatsby blog site:

- **[gatsby-plugin-google-gtag](https://www.gatsbyjs.org/packages/gatsby-plugin-google-gtag/):** Google Analytics for your Gatsby site with gtag.js

- **[gatsby-plugin-manifest](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/):** Enables web app manifest as part of the [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) specification

- **[gatsby-plugin-offline](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/):** Offline support for cached content

- **[gatsby-plugin-page-progress](https://www.gatsbyjs.org/packages/gatsby-plugin-page-progress/):** Scrolling page progress for blog posts

- **[gatsby-remark-autolink-headers](https://gatsbyjs.org/packages/gatsby-remark-autolink-headers/):** GitHub styled header links to jump to blog sections

- **[gatsby-remark-emojis](https://www.gatsbyjs.org/packages/gatsby-remark-emojis/):** Unicode emoji support :thumbsup:

- **[gatsby-remark-prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/):** Syntax highlighting for code blocks using [PrismJS](http://prismjs.com/)

## Future Work

While this site is exactly how I like it at this point, there are a few features I would like to work towards:

1. **Search**: search blog posts by text, not just tags
2. **Pagination**: pagination for index pages, so pages loaded faster into view in future with many posts
3. **Contact:question:**: form to send email (or is `mailto` link enough)

## Related

- [Markdown Test](/posts/markdown-test)

## External links

- [Div's Blog](https://divyanshu013.dev/)
