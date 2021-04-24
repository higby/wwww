# higby.github.io
I made this for me because I like making things

Feel free to fork, copy, learn from, steal, tear, and rip it up
## Config
Site is built from /src folder for organizations sake

Each new page has the `page` layout automatically applied. This can be overridden in an individual page's front matter.

All pages within the site are further organized into the /_pages folder and each page's permalink matches it's filename and directory stemming from here
## Pages
The front matter is used to define a number of things as shown below:
```
title: "Page title" # not the permalink

setup: # used  to begin the page setup section
  table: hidden
  date: hidden # including either of these removes the toc/ date from the page
  style: name # to have the page load an additional stylesheet (name.css)
  override: true # to have the page load only the specified stylesheet

tag(s): tag # if a page doesn't have a tag specified it won't be displayed on the index page

sitemap: false # used to remove a page from the generated sitemap 
```
## Build
Output HTML is tidied via `jekyll-tidy`

CSS is bundled vis SASS with the expanded style

As opposed to using the default Github Pages, this uses [Jekyll Deploy Action](https://github.com/jeffreytse/jekyll-deploy-action) made by [jeffreytse](https://github.com/jeffreytse) in order to use the plugins I would like to.
