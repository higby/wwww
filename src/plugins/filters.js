const dayjs = require('dayjs')

const toc = require('@higby/eleventy-plugin-nesting-toc')

module.exports = eleventyConfig => {
  eleventyConfig.addFilter('common', date => dayjs(date).format('YYYY-MM-DD'))
  eleventyConfig.addFilter('formal', date => dayjs(date).format('DD MMM YYYY'))
  eleventyConfig.addFilter('encodeuri', data => encodeURIComponent(data))

  eleventyConfig.addPlugin(toc, {
    wrapper: 'details open',
    wrapperClass: '',
    headingText: 'Table of Contents',
    headingTag: 'summary',
    headingPlacement: 'inside'
  })
}
