module.exports = data => {
  let pathParsed = data.filePathStem.split('/')
  if (pathParsed[pathParsed.length - 1] == 'index') pathParsed.pop()

  let path = '/'
  let breadcrumbs = [
    {
      fileSlug: 'index',
      filePathStem: path
    }
  ]

  for (let i = 1; i < pathParsed.length; i++) {
    path += `${pathParsed[i]}/`
    breadcrumbs.push({
      fileSlug: pathParsed[i],
      filePathStem: path
    })
  }

  return breadcrumbs
}
