import 'dotenv/config'
import EleventyFetch from '@11ty/eleventy-fetch'
import qs from 'qs'

const auth_key = process.env.LAST_FM_AUTH_KEY
const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

async function refreshAccessToken() {
  let cache = await EleventyFetch('https://accounts.spotify.com/api/token', {
    duration: '*',
    type: 'json',
    fetchOptions: {
      method: 'post',
      body: qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: client_id
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(client_id + ':' + client_secret).toString(
          'base64'
        )}`
      }
    }
  })

  return cache.access_token
}

async function searchForTrack(title, artist) {
  return await EleventyFetch(
    `https://api.spotify.com/v1/search?type=track&q=track:${title} artist:${artist}&limit=1`,
    {
      duration: '1w',
      type: 'json',
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${await refreshAccessToken()}`
        }
      }
    }
  )
}

async function fetchTopTracks() {
  return await EleventyFetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=hugabee&api_key=${auth_key}&format=json&period=7day&limit=25`,
    {
      duration: '1w',
      type: 'json'
    }
  )
}

export default async function () {
  let tracks = await fetchTopTracks()

  tracks = await tracks.toptracks.track

  let highestPlayCount = tracks[0].playcount

  tracks = tracks.map(entry => {
    return {
      name: entry.name,
      artist: entry.artist.name,
      playcount: entry.playcount,
      image: async () => {
        let results = await searchForTrack(entry.name, entry.artist.name)
        return await results.tracks.items[0].album.images[0].url
      },
      playCountPercentage: () => (entry.playcount / highestPlayCount) * 100
    }
  })

  return tracks
}
