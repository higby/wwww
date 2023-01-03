module.exports = config => {
  // ------------ Eleventy Settings ------------
  config.setQuietMode(true)
  config.setDataFileSuffixes(['.data', ''])
  config.setServerPassthroughCopyBehavior('copy')

  // ------------ Public Folder ------------
  config.addPassthroughCopy({ [`src/public/`]: '/' })
  config.addWatchTarget(`src/public/`)

  // ------------ Markdown ------------
  config.setLibrary('md', require('./src/plugins/markdown'))

  // ------------ Internal Plugins ------------
  config.addPlugin(require(`./src/plugins/collections`))
  config.addPlugin(require(`./src/plugins/filters`))
  config.addPlugin(require(`./src/plugins/transforms`))

  // ------------ External Plugins ------------
  config.addPlugin(require('@11ty/eleventy-plugin-rss'))
  config.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))
  config.addPlugin(require('eleventy-plugin-inline-sass'), {
    compiler: {
      loadPaths: [`./src/styles/`]
    }
  })

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      data: 'data',
      includes: 'components',
      input: 'src',
      layouts: 'templates',
      output: 'build'
    }
  }
}
