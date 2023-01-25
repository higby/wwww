module.exports = {
  permalink: data => {
    // ------------ Set Values ------------
    if (data.permalink != false) return data.permalink // if user specified `permalink`
    if (data.permalink === false) return false // if user specified `permalink: false`

    // ------------ Setup ------------
    let pathParsed = data.page.filePathStem.split('/')

    if (pathParsed.length <= 2) return // top level directory files
    pathParsed.splice(0, 1)

    if (
      pathParsed[pathParsed.length - 1] == 'index' &&
      pathParsed[pathParsed.length - 2].startsWith('_')
    )
      return `${pathParsed[pathParsed.length - 2].slice(1)}/` // special case

    // ------------ Parsing ------------
    pathParsed.forEach((entry, i) => {
      if (entry.startsWith('_')) delete pathParsed[i]
    })
    if (pathParsed[pathParsed.length - 1] == 'index') pathParsed.pop() // drop `index`
    pathParsed.filter(n => n)

    return `${pathParsed.join('/')}/`
  }
}
