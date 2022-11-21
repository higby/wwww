const cheerio = require('cheerio')
const minify = require('html-minifier').minify

const minifyOptions = {
  useShortDoctype: true,
  removeComments: true,
  collapseWhitespace: true
}

module.exports = eleventyConfig => {
  eleventyConfig.addTransform('safeLinks', (content, outputPath) => {
    if (!outputPath.endsWith('.html')) return content

    const $ = cheerio.load(content)
    const targetElementList = $(`
      a[href^='http://']:not([target]),
      a[href^='https://']:not([target])
    `)
    const relElementList = $(`
      a[href^='http://']:not([rel]),
      a[href^='https://']:not([rel])
    `)

    targetElementList.each((i, elem) => {
      $(elem).attr('target', '_blank')
    })
    relElementList.each((i, elem) => {
      $(elem).attr('rel', 'noopener noreferrer')
    })
    return $.html()
  })

  eleventyConfig.addTransform('emptyPTags', (content, outputPath) => {
    // there's probably a better way to go about this but I don't care
    return outputPath.endsWith('.html')
      ? content.replaceAll('<p></p>', '')
      : content
  })

  eleventyConfig.addTransform('eleventyComponent', (content, outputPath) => {
    if (!outputPath.endsWith('.html')) return content

    const $ = cheerio.load(content)

    const headerContent = $('eleventy-component#header').children().unwrap()
    const pageHeader = $('header#page-header')

    pageHeader.append(headerContent)

    return $.html()
  })

  // make sure this goes last
  eleventyConfig.addTransform('beautify', (content, outputPath) => {
    return outputPath.endsWith('.html')
      ? minify(content, minifyOptions)
      : content
  })
}
