---
layout: default
title: Branden Higby
permalink: /index.html
---

{% for tag in site.tags %}
  <h2 class="postTitle">{{ tag[0] | capitalize }}</h2>
  <ul class="posts">
    {% for post in tag[1] %}
      {% unless post.hidden %}
        <li>
          <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a> <time> {%- assign date_format = "%b %-d, %Y" -%} {{ post.date | date: date_format }}</time>
        </li>
      {% endunless %}
    {% endfor %}
  </ul>
{% endfor %}
