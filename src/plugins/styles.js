const fs = require('fs')
const autoprefixer = require('autoprefixer')
const cheerio = require('cheerio')
const duplicatecss = require('postcss-combine-duplicated-selectors')
const duplicatemediaquery = require('postcss-combine-media-query')
const postCSS = require('postcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const sass = require('sass')

module.exports = config => {
  config.addGlobalData('styles', async () =>
    fs.readFileSync('./src/assets/styles/base.scss', 'utf8')
  )

  config.addTransform('css', async (content, outputPath) => {
    if (outputPath && !outputPath.endsWith('.html')) return content

    const $ = cheerio.load(content)
    let styles = $('style').text()
    $('style').text('')

    async function compileSASS(styles) {
      return sass.compileString(styles, {
        style: 'compressed',
        loadPaths: [`./src/assets/styles/`]
      }).css
    }

    async function minifyCSS(styles) {
      return postCSS([
        autoprefixer,
        duplicatemediaquery, // make sure this is before `duplicatecss`
        duplicatecss({ removeDuplicatedValues: true }),
        purgecss({
          content: [
            {
              raw: $.html(),
              extension: 'html'
            }
          ]
        })
      ]).process(styles, { from: null })
    }

    styles = await compileSASS(styles)
    styles = await minifyCSS(styles)

    $('style').text(styles.css)

    return $.html()
  })
}
