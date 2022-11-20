module.exports = {
  title: data => data.title || `${data.page.fileSlug}`,
  description: data => data.description || `Higby's Garden`
}
