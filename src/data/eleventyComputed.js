module.exports = {
  description: data => data.description || `Higby's Garden`,
  permalink: data => {
    if (data.permalink) return data.permalink

    let expanded = data.page.filePathStem.split('/')
    expanded.splice(1, 1)

    if (expanded.at(-1) == 'index') expanded.pop()
    let joined = expanded.join('/') + '/' || '/'

    return `${joined}index.html`
  }
}
