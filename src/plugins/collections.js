const sortByTitle = content =>
  content.sort((a, b) => a.data.title.localeCompare(b.data.title))

const filterByValue = (content, value) =>
  content.filter(page => value in page.data)

module.exports = eleventyConfig => {
  eleventyConfig.addCollection('headerPages', collectionApi =>
    sortByTitle(filterByValue(collectionApi.getAll(), 'displayInHeader'))
  )
  eleventyConfig.addCollection('footerPages', collectionApi =>
    sortByTitle(filterByValue(collectionApi.getAll(), 'displayInFooter'))
  )
  eleventyConfig.addCollection('redirects', collectionApi =>
    filterByValue(collectionApi.getAll(), 'redirects')
  )
}
