module.exports = {
  permalink: data => {
    if (data.permalink != false) return data.permalink
    if (data.permalink === false) return false

    let pathParsed = data.page.filePathStem.split('/')

    if (pathParsed.length <= 2)
      throw new Error(`File too early in directory '${data.page.inputPath}'`)

    if (pathParsed[pathParsed.length - 1] == 'index') pathParsed.pop()
    pathParsed.splice(0, 2)

    return `${pathParsed.join('/')}/`
  }
}
