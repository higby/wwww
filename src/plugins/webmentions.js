const fetch = require('node-fetch')

module.exports = eleventyConfig => {
  eleventyConfig.addGlobalData('webmentions', async () => {
    return fetch(
      'https://webmention.io/api/mentions.jf2?token=-q1-Yduo0XirR7x4gQPiWw'
    )
      .then(res => res.json())
      .then(res => res.children)
  })

  eleventyConfig.addFilter('webmentionsFilter', function (data) {
    const pageURL = `${this.ctx.site.url}${this.ctx.page.url}`
    return data.filter(page => page['wm-target'] == pageURL)
  })
}
