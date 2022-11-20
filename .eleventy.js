const collections = require('./utils/collections')
const filters = require('./utils/filters')
const images = require('./utils/images')
const markdown = require('./utils/markdown')
const sass = require('./utils/sass')
const shortcodes = require('./utils/shortcodes')
const transforms = require('./utils/transforms')

module.exports = eleventyConfig => {
  eleventyConfig.setQuietMode(true)

  eleventyConfig.addWatchTarget('src/_assets/')
  eleventyConfig.addPassthroughCopy({ 'src/_assets': '/' })
  eleventyConfig.setServerPassthroughCopyBehavior('copy')

  eleventyConfig.addPlugin(collections)
  eleventyConfig.addPlugin(filters)
  eleventyConfig.addPlugin(images)
  eleventyConfig.addPlugin(sass)
  eleventyConfig.addPlugin(shortcodes)
  eleventyConfig.addPlugin(transforms)

  eleventyConfig.setLibrary('md', markdown)

  return {
    markdownTemplateEngine: 'njk',
    jsDataFileSuffix: '.data',
    dir: {
      assets: '_assets',
      data: '_data',
      input: 'src',
      images: '_img',
      layouts: '_templates',
      styles: '_styles',
      output: 'build'
    }
  }
}
