import { bundle, Features } from 'lightningcss'

function bundleCSS(file) {
  // Path to styles directory
  let path = `src/assets/styles/${file}.css`

  let bundledCSS = bundle({
    filename: path,
    minify: true,
    include: Features.Nesting,
    exclude: Features.Colors
  })

  return bundledCSS.code.toString()
}

export default eleventyConfig => {
  eleventyConfig.addShortcode('styles', async file => {
    // Assumes `main.css` to be the primary stylesheet
    let primaryStyles = bundleCSS('main')

    if (!file) return primaryStyles

    // Assumes each added stylesheet to be under the `pages` directory
    let secondaryStyles = bundleCSS(`pages/${file}`)

    return `${primaryStyles} ${secondaryStyles}`
  })
}
