---
title: "Year In Review"
date: 2020-04-12 00:05:00 -0800
description: "A Collection of My Yearly Reviews"
tag: essays
setup:
  table: hidden
  date: hidden
draft: true
---

{% for year in site.years reversed %}
## /<i class="higby">{{ year.path | remove: ".md"| remove: "_years/" }}</i> {{ year.title }}
{{ year.content }}
{% if forloop.last != true %}
<hr>
{% endif %}
{% endfor %}
