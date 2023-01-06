module.exports = {
  permalink: data => {
    // ------------ Set Values ------------
    if (data.permalink != false) return data.permalink // if user specified `permalink`
    if (data.permalink === false) return false // if user specified `permalink: false`

    // ------------ Setup ------------
    let pathParsed = data.page.filePathStem.split('/')
    if (pathParsed.length <= 2) return // top level directory files
    pathParsed.splice(0, 1)

    // ------------ Parsing ------------
    let folders = ['pages', 'plants'] // in order
    folders.forEach(folder => {
      if (pathParsed[0] == folder) pathParsed.shift()
    })
    if (pathParsed[pathParsed.length - 1] == 'index') pathParsed.pop() // drop `index`

    return `${pathParsed.join('/')}/`
  }
}
