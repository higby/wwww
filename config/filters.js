import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import posthtml from 'posthtml'
import baseurl from 'posthtml-urls'

import site from '../src/data/site.js'

export default eleventyConfig => {
  /* Date conversion using day.js https://day.js.org/docs/en/display/format
   * Inspired by https://github.com/maxboeck/mxb/blob/main/utils/filters.js#L16
   */
  eleventyConfig.addFilter('formatDate', async (goober, format) => {
    dayjs.extend(utc)
    return dayjs(goober).utc().format(format)
  })

  /* Convert dates into RSS compliant format */
  eleventyConfig.addFilter('toRFC822', goober => new Date(goober).toUTCString())

  /* This is used in order to have SVG favicons */
  eleventyConfig.addFilter('encodeURI', goober => encodeURIComponent(goober))

  /* Turn a relative URL into an absolute URL using the `site.url` global data
   * Modified from https://github.com/11ty/eleventy-plugin-rss/blob/master/src/absoluteUrl.js
   */
  eleventyConfig.addFilter('absoluteURL', goober => new URL(goober, site.url).href)

  /* Takes HTML and converts *all* the relative URLs into absolute
   * Modified from https://github.com/11ty/eleventy-plugin-rss/blob/master/src/htmlToAbsoluteUrls.js
   */
  eleventyConfig.addFilter('htmlAbsoluteURL', async goober => {
    let options = posthtml().use(
      baseurl({
        eachURL: url => new URL(url, site.url).href
      })
    )
    goober = await options.process(goober)
    return goober.html
  })
}
