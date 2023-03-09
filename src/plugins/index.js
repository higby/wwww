module.exports = config => {
  // ------------ External ------------
  config.addPlugin(require('@11ty/eleventy-plugin-bundle'), {
    bundles: ['stylesheet']
  })
  config.addPlugin(require('@11ty/eleventy-plugin-rss'))

  // ------------ Collections ------------
  config.addCollection('redirects', require(`./collections/redirects`))

  // ------------ Filters ------------
  config.addFilter('breadcrumbs', require(`./filters/breadcrumbs`))
  config.addFilter('date_formal', require(`./filters/date_formal`))
  config.addFilter('uri_encode', require(`./filters/uri_encode`))

  // ------------ Transforms ------------
  config.addTransform('images', require(`./transforms/images`))
  config.addTransform('urls', require(`./transforms/urls`))

  // ------------ Markdown ------------
  config.setLibrary('md', require('./markdown'))

  config.addPlugin(require(`./styles`)) // has to be second to last
  config.addTransform('html', require(`./transforms/html`)) // has to be last
}
