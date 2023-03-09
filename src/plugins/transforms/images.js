const cheerio = require('cheerio')
const Image = require('@11ty/eleventy-img')

module.exports = async (content, outputPath) => {
  if (outputPath && !outputPath.endsWith('.html')) return content

  const $ = cheerio.load(content)

  async function processImage(src) {
    return Image(src, {
      formats: ['avif', 'webp', 'jpeg'],
      urlPath: '/images',
      outputDir: './build/images/'
    })
  }

  for (let i = 0; i < $('img').length; i++) {
    let img = $($('img')[i])
    let src = img.attr('src')

    if (!src.includes('http')) src = `./src/assets/images/${src}`

    let alt = img.attr('alt')

    if (!alt) throw new Error(`Missing \`alt\` for image '${src}'`)

    let imgClass = img.attr('class')

    const stats = await processImage(src)

    const avif = stats['avif'][0]
    const webp = stats['webp'][0]
    const jpeg = stats['jpeg'][0]

    $($('img')[i]).replaceWith(
      $(`<picture ${imgClass ? `class="${imgClass}"` : ''}>
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
            >
          </picture>`)
    )
  }

  return $.html()
}
