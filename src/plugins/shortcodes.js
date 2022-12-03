module.exports = eleventyConfig => {
  // removed by "eleventyComponent" transform
  eleventyConfig.addPairedShortcode('headercontent', content => {
    return `<eleventy-component id="header">${content}</eleventy-component>`
  })
}
