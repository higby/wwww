import Image from '@11ty/eleventy-img'

export default eleventyConfig => {
  eleventyConfig.addShortcode('image', async (src, alt, imgClass) => {
    if (!alt) throw new Error(`Missing \`alt\` on image from: ${src}`)

    if (!src.startsWith('http')) src = `./src/assets/images${src.startsWith('/') ? src : `/${src}`}`

    let metadata = await Image(src, {
      formats: ['avif', 'webp', 'jpeg'],
      urlPath: '/images',
      outputDir: './build/images/'
    })

    return `<picture ${imgClass ? `class="${imgClass}"` : ''}>
      <source
        type="${metadata['avif'][0].sourceType}"
        srcset="${metadata['avif'][0].srcset}"
      >
      <source
        type="${metadata['webp'][0].sourceType}"
        srcset="${metadata['webp'][0].srcset}"
      >
      <img
        src="${metadata['jpeg'][0].url}"
        width="${metadata['jpeg'][0].width}"
        height="${metadata['jpeg'][0].height}"
        alt="${alt}"
        loading="lazy"
        decoding="async"
      >
    </picture>`
  })
}
