const cheerio = require('cheerio')
const { XMLParser } = require('fast-xml-parser'),
  parser = new XMLParser()
const EleventyFetch = require('@11ty/eleventy-fetch')

const cache = EleventyFetch('https://letterboxd.com/hugabee/rss/', {
  duration: '*',
  type: 'text'
})

function getImageSrc(data) {
  const $ = cheerio.load(data)

  let img = $('img')

  return img.attr('src')
}

function getReview(data) {
  const $ = cheerio.load(data)

  let review = $('p').eq(1).text()

  return review.startsWith('Watched on') ? false : review
}

function getRating(data) {
  let ratingIndex = data.indexOf(String.fromCharCode(9733))
  if (ratingIndex == -1) ratingIndex = data.indexOf(String.fromCharCode(189))
  if (ratingIndex == -1) return false

  return data.substr(ratingIndex)
}

async function buildMovieList() {
  let movies = []
  let parsedData = parser.parse(await cache).rss.channel.item.sort((a, b) => {
    let dateA = new Date(a['letterboxd:watchedDate'])
    let dateB = new Date(b['letterboxd:watchedDate'])
    return dateB - dateA
  })

  for (let i = 0; i < parsedData.length; i++) {
    movies.push({
      title: parsedData[i]['letterboxd:filmTitle'],
      year: parsedData[i]['letterboxd:filmYear'],
      watched: parsedData[i]['letterboxd:watchedDate'],
      rewatch: parsedData[i]['letterboxd:rewatch'] == 'No' ? false : true,
      imageSrc: getImageSrc(parsedData[i].description),
      review: getReview(parsedData[i].description),
      rating: getRating(parsedData[i].title)
    })
  }

  return movies
}

module.exports = async () => buildMovieList()
