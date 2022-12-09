const pluginRss = require('@11ty/eleventy-plugin-rss')

const collections = require('./src/plugins/collections')
const filters = require('./src/plugins/filters')
const images = require('./src/plugins/images')
const markdown = require('./src/plugins/markdown')
const sass = require('./src/plugins/sass')
const shortcodes = require('./src/plugins/shortcodes')
const transforms = require('./src/plugins/transforms')

module.exports = eleventyConfig => {
  eleventyConfig.setQuietMode(true)

  eleventyConfig.addWatchTarget('src/public/')
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' })
  eleventyConfig.setServerPassthroughCopyBehavior('copy')

  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addPlugin(collections)
  eleventyConfig.addPlugin(filters)
  eleventyConfig.addPlugin(images)
  eleventyConfig.addPlugin(markdown)
  eleventyConfig.addPlugin(sass)
  eleventyConfig.addPlugin(shortcodes)
  eleventyConfig.addPlugin(transforms)

  return {
    markdownTemplateEngine: 'njk',
    jsDataFileSuffix: '.data',
    dir: {
      data: 'data',
      includes: 'components',
      input: 'src',
      images: 'images',
      layouts: 'templates',
      styles: 'styles',
      output: 'build'
    }
  }
}
