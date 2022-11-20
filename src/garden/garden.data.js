module.exports = {
  // layout: "plant.njk",
  permalink:
    "{{ page.filePathStem | replace('/garden', '') | replace('/index', '') }}/",
  tags: 'garden'
}
