module.exports = collectionApi => collectionApi.getAll().filter(page => 'redirect' in page.data)
