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

  // wow Branden why do you have this?
  // it's so that I can have the garden tag not include `/index`
  // but not remove it from `collections.all`
  eleventyConfig.addCollection('garden', collectionApi =>
    collectionApi
      .getAll()
      .filter(
        page =>
          !('ignoreCollections' in page.data) &&
          page.data.tags?.includes('garden')
      )
  )
}
