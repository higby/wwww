module.exports = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: false
})
  .use(require('markdown-it-anchor'))
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-implicit-figures'))
