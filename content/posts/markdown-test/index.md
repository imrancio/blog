---
title: 'Markdown Test'
date: '2020-01-14'
description: 'This blog entry is meant to give an overview of Markdown syntax supported through currently installed plugins'
tags: ['markdown', 'test']
image: ./og-image.jpg
time: 2
external: 'https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax'
---

## Content

- [Links](#links)
- [Headings](#headings)
- [Horizontal Rules](#horizontal-rules)
- [Emphasis](#emphasis)
- [Blockquotes](#blockquotes)
- [Lists](#lists)
  - [unordered](#unordered)
  - [ordered](#ordered)
- [Code](#code)
- [Tables](#tables)
- [Images](#images)
- [Unicode Emojies](#unicode-emojies)
- [Footnotes](#footnotes)

## Links

- **[Gatsby](https://www.gatsbyjs.org/ 'Gatsby!')** - link to the gatsby webpage.

---

## Headings

# h1 Heading

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

## Horizontal Rules

---

---

---

## Emphasis

**This is bold text**

**This is bold text**

_This is italic text_

_This is italic text_

~~Strikethrough~~

## Blockquotes

> Blockquote
>
> > nested Blockquote
> >
> > > Blockquote nested inside a nested Blockquote

## Lists

### unordered

- First element inside unordered list
- Second element inside unordered list
  - Subelement
  * Subelement with asterist
  - Subelement with plus
- Third element inside unordered list

### ordered

1. First element inside ordered list
2. Second element inside ordered list
3. Third element inside ordered list

## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

```
Sample text here...
```

Syntax highlighting for Javascript code

```javascript
var foo = function (bar) {
	return bar++;
};

console.log(foo(5));
```

Syntax highlighting with line numbers

```javascript{numberLines: true}
var foo = function (bar) {
	return bar++;
};

console.log(foo(5));
```

Syntax highlighting with line number starting at 5:

```javascript{numberLines: 5}
console.log(foo(5));
```

Syntax highlighting for shell script:

```bash
#!/bin/bash

echo "Hello World"
```

Special prompt for bash / shell scripts:

```bash{outputLines: 2-3}{promptUser:root}{promptHost: imranc.io}
#!/bin/bash

echo "Hello World"
```

## Tables

| Option | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

## Images

Inline-style:
![alt text](https://cdn.imranc.io/static/blog/posts/markdown-test/wikipedia.png 'Logo Title Text 1')

Reference-style:
![alt text][logo]

[logo]: https://cdn.imranc.io/static/blog/posts/markdown-test/google.png 'Logo Title Text 2'

Local Image:
![local image](./gatsby.jpg 'local imgae')

Local Image via HTML with width applied:

<div style="width: 20px;"><img src="./gatsby.jpg" alt="Gatsby Logo" /></div>

### Unicode Emojies

:wink: :cry: :heart: :laughing: :yum:

Made with :heart: with GatsbyJS

### Footnotes

Footnote 1 link[^first].

Footnote 2 link[^second].
