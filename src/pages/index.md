---
layout: default
title: Branden Higby
permalink: /index.html
---

{% capture order %}essays,poetry,collections,programming,misc{% endcapture %}
{% assign order = order | split: "," %}

{% for heading in order %}
{% for tag in site.tags %}
{% if tag[0] == heading %}

  <h2 class="postTitle">{{ tag[0] | capitalize }}</h2>
  <ul class="posts">
    {% for post in tag[1] %}
      {% unless post.hidden %}
        <li>
          {% if post.collection == 'internal' %}
            <a class="pageUpdate" href="{{ post.url | relative_url | remove: ".html" }}">{{ post.title | escape }}</a> <time> {%- assign date_format = "%b %-d, %Y" -%} {{ post.date | date: date_format }}</time>
          {% endif %}

          {% if post.collection == 'external' %}
            <a href="{{ post.link }}">{{ post.title | escape }}</a> <span> {{ post.source }}</span>
          {% endif %}
        </li>
      {% endunless %}
    {% endfor %}
  </ul>
  {% endif %}
{% endfor %}
{% endfor %}
