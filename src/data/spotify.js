const qs = require('qs')
const EleventyFetch = require('@11ty/eleventy-fetch')

require('dotenv').config()

const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN
const auth = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString('base64')

async function getAccessToken() {
  const response = await EleventyFetch(
    'https://accounts.spotify.com/api/token',
    {
      duration: '0s',
      type: 'json',
      fetchOptions: {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify({
          grant_type: 'refresh_token',
          refresh_token
        })
      }
    }
  )

  return response.access_token
}

module.exports = async () =>
  EleventyFetch(
    'https://api.spotify.com/v1/me/top/tracks?time_range=short_term',
    {
      duration: '*',
      type: 'json',
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`
        }
      }
    }
  )
