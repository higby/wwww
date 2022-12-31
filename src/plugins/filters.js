const dayjs = require('dayjs')

const toc = require('@higby/eleventy-plugin-nesting-toc')

module.exports = config => {
  config.addFilter('common', date => dayjs(date).format('YYYY-MM-DD'))

  config.addFilter('formal', date => dayjs(date).format('DD MMM YYYY'))

  config.addFilter('encodeuri', data => encodeURIComponent(data))

  config.addPlugin(toc, {
    wrapper: 'details open',
    wrapperClass: '',
    headingText: 'Table of Contents',
    headingTag: 'summary',
    headingPlacement: 'inside'
  })
}
