module.exports = config => {
  config.addCollection('redirects', collectionApi =>
    collectionApi.getAll().filter(page => 'redirects' in page.data)
  )

  config.addCollection('garden', collectionApi =>
    collectionApi
      .getFilteredByGlob('./src/_pages/_garden/**')
      .filter(page => page.data.page.url != '/garden/')
  )

  config.addCollection('library', collectionApi =>
    collectionApi
      .getFilteredByGlob('./src/_pages/_library/**')
      .filter(page => page.data.page.url != '/library/')
  )
}
