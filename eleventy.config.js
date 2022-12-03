const faviconsPlugin = require('eleventy-plugin-gen-favicons')
const pluginRss = require('@11ty/eleventy-plugin-rss')

const collections = require('./plugins/collections')
const filters = require('./plugins/filters')
const images = require('./plugins/images')
const markdown = require('./plugins/markdown')
const sass = require('./plugins/sass')
const shortcodes = require('./plugins/shortcodes')
const transforms = require('./plugins/transforms')

module.exports = eleventyConfig => {
  eleventyConfig.setQuietMode(true)

  eleventyConfig.addWatchTarget('src/_assets/')
  eleventyConfig.addPassthroughCopy({ 'src/_assets': '/' })
  eleventyConfig.setServerPassthroughCopyBehavior('copy')

  eleventyConfig.addPlugin(faviconsPlugin, {
    outputDir: 'build'
  })
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
