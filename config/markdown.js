import md from 'markdown-it'
import mdAnchor from 'markdown-it-anchor'
import mdAttribution from 'markdown-it-attribution'
import mdAttrs from 'markdown-it-attrs'
import mdDeflist from 'markdown-it-deflist'

const markdown = md({
  html: true,
  breaks: true,
  linkify: true
})
  .use(mdAnchor)
  .use(mdAttribution, {
    classNameContainer: 'quote',
    classNameAttribution: 'attribution',
    removeMarker: false
  })
  .use(mdAttrs)
  .use(mdDeflist)

export default eleventyConfig => eleventyConfig.setLibrary('md', markdown)
