const collections = require('./plugins/collections')
const filters = require('./plugins/filters')
const images = require('./plugins/images')
const markdown = require('./plugins/markdown')
const sass = require('./plugins/sass')
const shortcodes = require('./plugins/shortcodes')
const transforms = require('./plugins/transforms')

const pluginRss = require('@11ty/eleventy-plugin-rss')

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

  eleventyConfig.addPlugin(pluginRss)

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
