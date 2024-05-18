---
title: 'asciinema + audio / video streaming'
date: 2024-05-15
description: 'Demo of asciinema integration into this blog, along with several other streaming services'
tags: ['blog', 'iframe', 'Gatsby', 'markdown', 'software', 'workflow']
---

`video: https://asciinema.org/a/bJMOlPe5F4mFLY0Rl6fiJSOp3.js?height=609`

Above, you can see a stream of what is called [`asciicast`](https://docs.asciinema.org/manual/asciicast/v2/) on the [`asciinema` player](https://docs.asciinema.org/manual/player/). `asciicast` is an open standard for streaming [ASCII text](https://www.ascii-code.com/). It is intended for capturing and streaming your terminal sessions over the web. Any coloured output from your terminal is captured and preserved for the stream. All the text from the terminal output is selectable and copyable throughout the stream. Try to highlight a moving object in the above stream and notice how your selection is preserved as the text stream changes and the object moves. You can hit <kbd>ctrl</kbd> + <kbd>c</kbd> to copy at any time of the stream and when you paste (<kbd>ctrl</kbd> + <kbd>v</kbd>) in notepad, notice the object is in the same position when you copied the text from the stream.

I can optionally change the theme of the terminal for the playback of the same stream.

`video: https://asciinema.org/a/bJMOlPe5F4mFLY0Rl6fiJSOp3?theme=solarized-dark&height=609`

Here is another stream of a terminal-based game called [`gorched`](https://github.com/zladovan/gorched) with different terminal height / aspect ratio:

`asciinema: https://asciinema.org/a/335029?height=459`

I can specify the stream to auto-play at a specific time in the stream with a specific playback speed (reload page <kbd>F5</kbd> to restart stream auto-playback):

`asciinema: https://asciinema.org/a/335029?height=459&start-at=0:05&speed=2`

Under the hood, this is all working with [iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe). I am using a combination of [`gatsby-remark-responsive-iframe`](https://www.gatsbyjs.com/plugins/gatsby-remark-responsive-iframe/) and `gatsby-remark-embed-stream` (modified version of [`gatsby-remark-embed-video`](https://www.gatsbyjs.com/plugins/gatsby-remark-embed-video/)) to lazy-load responsive `asciinema` player `iframes` for specific streams as you scroll through the post. This is not the fastest approach for streaming content, but is definitely one of the lightest approaches. My site does not host any individual players or streams, but is able to embed content from various streaming services.

The styling is still a bit rough. I have to clean it up later. The `asciinema` player does not work well with dark theme and there is an ugly banner underneath the player that is either visible, partially visible, or hidden depending on your screen width.

I can also embed traditional video streams from sources like Loom, TikTok, Twitch, Vimeo, YouTube, etc.

`youtube: https://www.youtube.com/watch?v=XEzRZ35urlk&ab_channel=Google&height=450`

`twitch: https://clips.twitch.tv/StylishScrumptiousBobaTheTarFu?height=450`

Or embed audio streams from services like Spotify or SoundCloud:

`spotify: https://open.spotify.com/episode/7edwvm2c6Ieuzun4xtFYCJ?theme=0&height=182`

`spotify: https://open.spotify.com/embed/playlist/2Tb8kSk3fyqLO8EhcSr1bp?autoplay=false&height=800`

`soundcloud: https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1711497186&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`

All I have to do to embed various streams like above to my post is add some markdown text blocks like so:

```markdown
`asciinema: https://asciinema.org/a/335029?height=459`

`spotify: https://open.spotify.com/episode/7edwvm2c6Ieuzun4xtFYCJ?theme=0&height=182`

`twitch: https://clips.twitch.tv/StylishScrumptiousBobaTheTarFu?height=450`

`youtube: https://www.youtube.com/watch?v=XEzRZ35urlk&ab_channel=Google&height=450`
```

Back to `asciinema`. I think this can be a great teaching / learning tool for developers. It can be especially handy for showcasing CLI apps / usage in terminals. Or you can use it as a novel form of entertainment. The possibilities are limitless.

`asciinema: https://asciinema.org/a/569727?height=455`

Comment below if you'd like me to publish a version of [`gatsby-remark-embed-stream`](https://github.com/imrancio/blog/tree/main/plugins/gatsby-remark-embed-stream) on `npm` with full support for `asciinema`, including self-hosted `asciinema` server URLs, along with all the additional `iframe` service integrations shown above.
