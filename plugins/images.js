const path = require('path')
const Image = require('@11ty/eleventy-img')

module.exports = eleventyConfig => {
  eleventyConfig.addNunjucksAsyncShortcode(
    'image',
    async function (image, alt) {
      const imagePath = `./${eleventyConfig.dir.input}/${eleventyConfig.dir.images}/${image}`

      if (!alt)
        throw new Error(`Missing \`alt\` for image on ${this.page.inputPath}`)

      const metadata = await Image(imagePath, {
        formats: ['avif', 'webp', 'jpeg'],
        outputDir: './build/img/',
        filenameFormat: (id, src, width, format) =>
          `${path.parse(src).name}.${format}`
      })

      const avif = metadata['avif'][0]
      const webp = metadata['webp'][0]
      const jpeg = metadata['jpeg'][0]

      return `<picture>
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
          decoding="async">
      </picture>`
    }
  )
}
