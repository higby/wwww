import collections from './config/collections.js'
import filters from './config/filters.js'
import markdown from './config/markdown.js'
import shortcodes from './config/shortcodes.js'

import images from './config/plugins/images.js'
import styles from './config/plugins/styles.js'

export default eleventyConfig => {
  eleventyConfig.setDataFileSuffixes(['.data', ''])

  eleventyConfig.addWatchTarget(`./src/assets/`)
  eleventyConfig.addPassthroughCopy({ [`src/assets/static/`]: '/' })

  eleventyConfig.addPlugin(collections)
  eleventyConfig.addPlugin(filters)
  eleventyConfig.addPlugin(markdown)
  eleventyConfig.addPlugin(shortcodes)

  eleventyConfig.addPlugin(images)
  eleventyConfig.addPlugin(styles)

  return {
    htmlTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',

    dir: {
      input: 'src/pages',
      includes: '../templates/includes',
      layouts: '../templates/layouts',
      data: '../data',
      output: 'build'
    }
  }
}
