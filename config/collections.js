import _ from 'lodash'

export default eleventyConfig => {
  eleventyConfig.addCollection('garden', collection =>
    _.chain(collection.getFilteredByGlob('src/pages/**/*').filter(page => 'garden' in page.data))
      .sortBy('date')
      /* https://darekkay.com/blog/eleventy-group-posts-by-year/ */
      .groupBy(page => ('pinned' in page.data ? 'Pinned' : page.date.getFullYear()))
      .toPairs()
      .reverse()
      .value()
  )
  eleventyConfig.addCollection('published', collection =>
    _.chain(collection.getFilteredByGlob('src/pages/writing/**/*'))
      .sortBy(['data.published', 'date'])
      .reverse()
      .value()
  )
}
