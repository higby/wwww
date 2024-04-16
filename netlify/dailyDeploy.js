const axios = require('axios')
const { schedule } = require('@netlify/functions')

const handler = async function (event, context) {
  try {
    axios({
      method: 'post',
      url: process.env.NETLIFY_DEPLOY_URL
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports.handler = schedule('@daily', handler)
