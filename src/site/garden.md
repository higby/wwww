---
title: "My Garden"
permalink: "/garden/index.html"
tags: flowers
setup:
  toc: false
---

{% capture order %}essays,poetry,collections,programming,misc{% endcapture %}
{% assign order = order | split: "," %}

{% capture allTags %}{% for post in collections.flowers %}{{ post.data.tags[0] }}{% unless forloop.last == true %},{% endunless %}{% endfor %}{% endcapture %}
{% assign allTags = allTags | split: "," | uniq %}

<nav>
{% for heading in order %}
{% for tag in allTags %}
{% if tag == heading %}
<h2>{{ tag | capitalize }}</h2>
<ul>
  {% for flower in collections.flowers %}
  {% if flower.data.tags[0] == tag and flower.data.draft != true %}
  <li>
    <div><a href="{{ flower.url }}" {% unless flower.data.stylesheet != "main" %}class="internal"{% endunless %}>{{ flower.data.title }}</a></div>
    <time>{{ flower.date | common }}</time>
    {% if flower.data.description %}<p>{{ flower.data.description }}</p>{% endif %}

  </li>
  {% endif %}
  {% endfor %}
</ul>
{% endif %}
{% endfor %}
{% endfor %}
</nav>
