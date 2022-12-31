function sortByTitle(content) {
  return content.sort((a, b) => a.data.title.localeCompare(b.data.title))
}

function filterByValue(content, value) {
  return content.filter(page => value in page.data)
}

module.exports = config => {
  config.addCollection('headerPages', collectionApi =>
    sortByTitle(filterByValue(collectionApi.getAll(), 'displayInHeader'))
  )

  config.addCollection('footerPages', collectionApi =>
    sortByTitle(filterByValue(collectionApi.getAll(), 'displayInFooter'))
  )

  config.addCollection('redirects', collectionApi =>
    filterByValue(collectionApi.getAll(), 'redirects')
  )
}
