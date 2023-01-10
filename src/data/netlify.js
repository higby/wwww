const EleventyFetch = require('@11ty/eleventy-fetch')

require('dotenv').config()

const url = `https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}`

module.exports = async () =>
  EleventyFetch(url, {
    duration: '*',
    type: 'json',
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${process.env.NETLIFY_TOKEN}`
      }
    }
  })
