# hgb `version 2`
[![Visits Badge](https://badges.pufler.dev/visits/higby/hgb)](https://badges.pufler.dev)

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

Hosted on Netlify.

[![Netlify Status](https://api.netlify.com/api/v1/badges/62f8586d-7d71-442d-bf29-b8ce86c7155a/deploy-status)](https://app.netlify.com/sites/gifted-montalcini-5624ec/deploys)
