const autoprefixer = require('autoprefixer')
const cheerio = require('cheerio')
const duplicatecss = require('postcss-combine-duplicated-selectors')
const duplicatemediaquery = require('postcss-combine-media-query')
const Image = require('@11ty/eleventy-img')
const minify = require('html-minifier').minify
const postCSS = require('postcss')
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = config => {
  config.addTransform('images', async (content, outputPath) => {
    if (!outputPath.endsWith('.html')) return content
    const $ = cheerio.load(content)

    async function processImage(src) {
      return Image(src, {
        formats: ['avif', 'webp', 'jpeg'],
        urlPath: '/images',
        outputDir: './build/images/'
        /*filenameFormat: (id, src, width, format) =>
          `${path.parse(src).name}.${format}`*/
      })
    }

    for (let i = 0; i < $(`img`).length; i++) {
      let img = $($(`img`)[i])
      let src = img.attr('src')

      if (!src.includes('http')) src = `./src/images/${src}`

      let alt = img.attr('alt')

      if (!alt) throw new Error(`Missing \`alt\` for image '${src}'`)

      let imgClass = img.attr('class')

      const stats = await processImage(src)

      const avif = stats['avif'][0]
      const webp = stats['webp'][0]
      const jpeg = stats['jpeg'][0]

      $($(`img`)[i]).replaceWith(
        $(`<picture>
            <source
              type="${avif.sourceType}"
              srcset="${avif.srcset}">
            <source
              type="${webp.sourceType}"
              srcset="${webp.srcset}">
            <img
              src="${jpeg.url}"
              width="${jpeg.width}"
              height="${jpeg.height}"
              alt="${alt}"
              loading="lazy"
              decoding="async"
              ${imgClass ? `class="${imgClass}"` : ''}>
          </picture>`)
      )
    }

    return $.html()
  })

  config.addTransform('CSS', async (content, outputPath) => {
    if (!outputPath.endsWith('.html')) return content

    const $ = cheerio.load(content)
    const styles = $('style').text()

    $('style').text('')

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
    const result = await minifyCSS(styles)

    $('style').text(result.css)

    return $.html()
  })

  config.addTransform('safeLinks', (content, outputPath) => {
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

  // ------------ Final Transform ------------
  config.addTransform('beautify', (content, outputPath) =>
    outputPath.endsWith('.html')
      ? minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        })
      : content
  )
}
