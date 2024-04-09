import QRCode from 'qrcode'

import site from '../src/data/site.js'

export default eleventyConfig => {
  eleventyConfig.addShortcode('qr', async function () {
    let goober = new URL(this.page.url, site.url).href
    return await QRCode.toString(goober, {
      type: 'svg',
      margin: 0
    })
  })
}
