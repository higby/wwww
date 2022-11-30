const dayjs = require('dayjs')

module.exports = eleventyConfig => {
  eleventyConfig.addFilter('common', date => dayjs(date).format('YYYY-MM-DD'))
  eleventyConfig.addFilter('formal', date => dayjs(date).format('DD MMM YYYY'))
  eleventyConfig.addFilter('encodeuri', data => encodeURIComponent(data))
}
