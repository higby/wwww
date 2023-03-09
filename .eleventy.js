module.exports = config => {
  config.setQuietMode(true)

  config.setDataFileSuffixes(['.data', ''])

  config.addWatchTarget(`src/assets/`)
  config.addPassthroughCopy({ [`src/assets/public/`]: '/' })

  config.addPlugin(require(`./src/plugins`))

  return {
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'liquid',
    dir: {
      data: '../data',
      includes: '../components',
      input: 'src/pages',
      layouts: '../components/templates',
      output: './build'
    }
  }
}
