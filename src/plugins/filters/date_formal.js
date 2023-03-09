const dayjs = require('dayjs')

module.exports = data => dayjs(data).format('DD MMM YYYY')
