module.exports = "{% assign url = page.filePathStem | split: '/' %}{% for segment in url offset:2 %}{{segment}}/{% endfor %}"