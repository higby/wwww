const sass = require('sass')

module.exports = eleventyConfig => {
  eleventyConfig.addDataExtension('scss', data => {
    return {
      scss: sass.compileString(data, {
        loadPaths: [
          `./${eleventyConfig.dir.input}/${eleventyConfig.dir.styles}`
        ],
        style: 'compressed'
      }).css
    }
  })
}
