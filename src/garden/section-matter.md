---
title: "gray-matter Sections"
description: "My collection of wonderful shiny Pokemon."
date: 2022-08-18
---

## Preamble

The [gray-matter](https://github.com/jonschlinkert/gray-matter) package includes multiple ways to read data from files, Eleventy has already implemented two methods:^[Inlines notes are easier to write, since
you don't have to pick an identifier and move down to type the
note.]

### Front Matter

**Input**:

```md
---
title: Hi
---

This is content
```

**Output**:

```js
{
  content: 'This is content',
  data: {
    title: 'Hi'
  }
}
```

### Excerpts

**Input**:

```md
---
title: Hi
---

## This is an excerpt

This is content
```

**Output**:

```js
{
  content: 'This is an excerpt. This is content',
  data: {
    title: 'Hi'
  },
  excerpt: 'This is an excerpt.'
}
```

`gray-matter` however includes one more method:

### Sections

**Input**:

```md
---
title: hi
---

This is content

---section
title: Section One

---

This is section one
```

**Output**:

```js
{
  content: 'This is content',
  sections: [
    {
      key: 'section',
      data: {
        title: 'First section'
      }
      content: 'This is section one'
    }
  ]
}
```

---

Not only do I believe this feature should be added just on the merit of Eleventy missing one-third of it's front matter capability, but sections actually come with quite a few interesting quirks.^[Inier and move down to type the note.]

This feature of **gray-matter** is not documented entirely well on it's page or in it's options, which is probably due to the fact that it is actually from a different package called [sections-matter](https://github.com/jonschlinkert/section-matter) (same author) that gets [built into it](https://github.com/jonschlinkert/gray-matter/blob/a5726b04f3167fadc764241deb545518c454eb82/package.json#L48).

So after digging through **section-matter**'s docs, here is what I put together.

## Quirks

### When files are processed, the entirety of the section gets removed from the content

_(This can be seen in the code example above)_

This would facilitate a great many creative uses, the first one that comes to my mind being a solution to this issue: https://github.com/11ty/eleventy/issues/685 ^[Inlines notes are easier to write, since you don't have to pick this one is like SUPER MAD LONG sfnbshdbf sdb asdasb fbfebybfe bfweb ybewfyeb febynd move down to type the
note.]

#### Use Case

**index.md**:

```md
---
title: Hi
layout: layout.njk
---

This is content

## ---css

body {
background-color: blue;
}
```

**layout.njk**:

```md
<head>
  <style>
    {{ page.section | safe }}
  </style>
</head>

<body>
  <h1>{{ title }}</h1>
  {{ content | safe }}
</body>
```

> The `{{ page.section }}` portion has been reduced for practicality. In practice it would need to be a for if loop. See: Caveat #2

**index.html** (result):

```html
<head>
  <style>
    body {
      background-color: blue;
    }
  </style>
</head>

<body>
  <h1>Hi</h1>
  <p>This is content</p>
  <p></p>
</body>
```

### `section-matter` can run functions on the collected data

That heading probably doesn't explain it too well so here's a very simple example:

If we were to add the following to our `.eleventy.js`:

```js
eleventyConfig.setFrontMatterParsingOptions({
  sections: true,
  section: {
    parse: function (section) {
      console.log("hi");
    },
  },
});
```

Then the added function would write `hi` to our console for each section that **section-matter** reads.

This lends itself to a lot of potential cool uses:

#### Use Case

Seeing how front matter isn't rendered into eleventy, we can render the section with the function ourselves:

**index.md**:

```md
---
title: Hi
layout: layout.njk
---

This is content

---list
render: md

---

- This is a list
- A list
  - A sublist
```

By default this section when added back in via template wouldn't be rendered in markdown. But if we added this _very rough_ snippet to our config:

```js
const md = require("markdown-it")();
const yaml = require("js-yaml");

config.setFrontMatterParsingOptions({
  sections: true,
  section: {
    parse: function (section) {
      section.data = yaml.load(section.data);
      if (section.data) {
        if (section.data.render == "md") {
          section.content = md.render(section.content);
        }
      }
    },
  },
});
```

> redundant code hidden

Then the output section content would indeed be rendered as an html list.

## Quick Notes

- The delimiter can be changed
- It does work with excerpts
- I was unable to write the code so that an empty `sections` wasn't passed to `{{ page }}` the way that excerpts don't
- I did all of the testing locally, but I did not write any tests for the repository as I am not familiar with the testing suite used
- The PR is relatively small as **gray-matter** will already read _and remove_ sections from files if `sections: true` is passed in the config, the only change I made was sending the data to the template

## Caveats

- All sections require a key following it's opening delimiter
- The way the data is output makes using it slightly inconvenient, as the `key`, `data`, and `content` objects are all on the same level within the data output:

```js
sections: [
    {
      key: 'section',
      data: {
        title: 'First section'
      }
      content: 'This is section one'
    }
  ]
```

- All sections have to come after the page content
- The key for inputting options is slightly funky, needing you to enable `sections`, then write the options to the key `section`

```js
module.exports = (config) => {
  config.setFrontMatterParsingOptions({
    sections: true,
    section: {
      section_delimiter: ":::",
    },
  });
```

- You will need to apply the `safe` filter for the output sections (at least for nunjucks)
- In the **section-matter** docs it states that the callback function option is `section_parse` when it is acutally just `parse` https://github.com/jonschlinkert/section-matter/issues/1
- By default anything in the data key will be stored as a string instead of an object, this can be fixed using the callback function to turn it into an object before it's used:

```
section.data = yaml.load(section.data);
```
