const dayjs = require('dayjs')

module.exports = () => dayjs(new Date()).format('DD-MM-YYYY h:mm A')
