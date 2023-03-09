const cheerio = require('cheerio')

module.exports = async (content, outputPath) => {
  if (outputPath && !outputPath.endsWith('.html')) return content

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
}
