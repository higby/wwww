---
title: "Year In Review"
date: 2020-04-12 00:05:00 -0800
description: "A Collection of My Yearly Reviews"
setup:
  date: hidden
tag: essays
draft: true
---

{% for year in site.years reversed %}
<h2 id="{{ year.path | remove: ".md"| remove: "_years/" }}"><i class="higby">{{ year.path | remove: ".md"| remove: "_years/" }}</i> {{ year.title }}</h2>
{{ year.content | liquify }}
{% if forloop.last != true %}
<hr>
{% endif %}
{% endfor %}
