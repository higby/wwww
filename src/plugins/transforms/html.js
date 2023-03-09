const minify = require('html-minifier').minify

module.exports = async (content, outputPath) =>
  outputPath && outputPath.endsWith('.html')
    ? minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
    : content
