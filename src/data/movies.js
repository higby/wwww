import * as cheerio from 'cheerio'
import { XMLParser } from 'fast-xml-parser'
import _ from 'lodash'
import EleventyFetch from '@11ty/eleventy-fetch'

const parser = new XMLParser()

export default async function () {
  const cache = await EleventyFetch('https://letterboxd.com/higby_/rss/', {
    duration: '0s',
    type: 'text'
  })

  let films = parser
    .parse(cache)
    .rss.channel.item.filter(entry => !entry.link.includes('/list/'))
    .map(entry => {
      return {
        title: entry['letterboxd:filmTitle'],
        year: entry['letterboxd:filmYear'],
        // TODO: Turn the following into a Liquid filter
        rating: () => {
          let rating = entry['letterboxd:memberRating']
          let stars = ''
          let floor = Math.floor(rating)
          for (let i = 0; i < floor; i++) stars += '★'
          if (rating - floor == 0.5) stars += '½'
          return stars
        },
        twoThumbsUp: () => (entry['letterboxd:memberRating'] > 4.4 ? true : false),
        date: entry['letterboxd:watchedDate'],
        review: () => {
          const $ = cheerio.load(entry.description, null, false)
          $('p').first().remove()
          if ($('p').first().text().startsWith('Watched on ')) $('p').first().remove()
          return $.html()
        }
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  let groupedFilms = _.chain(films)
    .groupBy(entry => new Date(entry.date).getFullYear())
    .toPairs()
    .reverse()
    .value()

  return groupedFilms
}
