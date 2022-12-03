const markdownIt = require('markdown-it')

const md = markdownIt({
  html: true,
  breaks: true,
  linkify: false
})
  .use(require('markdown-it-anchor'), { tabIndex: false })
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-implicit-figures'))

// Table of Contents

const tocRules = {
  toc_open: () => '<details><summary>Table of Contents</summary>',
  toc_close: () => '</details>'
}

Object.entries(tocRules).forEach(
  rule => (md.renderer.rules[rule[0]] = () => rule[1]())
)

// Footnotes

const footnoteRules = {
  footnote_ref: (id, caption) =>
    `<sup><a href="#fn${id}" id="fnref${id}">${caption}</a></sup>`,
  footnote_open: id => `<li id="fn${id}">`,
  footnote_anchor: id => ` <a href="#fnref${id}">\u21a9\uFE0E</a>`
}

md.renderer.footnote_block_open = () => '<hr><section><ol>'

Object.entries(footnoteRules).forEach(
  rule =>
    (md.renderer.rules[rule[0]] = (tokens, idx, options, env, slf) => {
      const id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)
      const caption = slf.rules.footnote_caption(tokens, idx, options, env, slf)
      return rule[1](id, caption)
    })
)

module.exports = eleventyConfig => {
  eleventyConfig.setLibrary('md', md)
}
