---
layout: index
title: Branden Higby
permalink: /index.html
---
{%- assign date_format = "%b %-d, %Y" -%}
{% capture order %}essays,poetry,collections,programming,misc{% endcapture %}
{% assign order = order | split: "," %}

{% for heading in order %}
{% for tag in site.tags %}
{% if tag[0] == heading %}

  <h2>{{ tag[0] | capitalize }}</h2>
  <ul>
    {% for post in tag[1] %}
      {% unless post.category %}
        <li>
          {% if post.collection == "internal" %}
            <span><a href="{{ post.url | relative_url | remove: ".html" }}" {% unless post.setup.style %}class="internal" {% endunless %}>{{ post.title | escape }}</a> <time> / {{ post.date | date: date_format }}</time></span>
          {% else %}
            <span><a href="{{ post.link }}">{{ post.title | escape }}</a> <time> / {{ post.date | date: date_format }}</time></span>
          {% endif %}
        </li>
      {% endunless %}
    {% endfor %}


    {% for category in site.categories %}
    {% assign subposts = category[1] | where: "tags",tag[0] %}
      {% if subposts.size > 0 %}
        <li>
          <span>
            <svg height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" fill="#4b4b4b">
              <path fill-rule="evenodd" d="M8.72 18.78a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06L9.78 5.22a.75.75 0 00-1.06 1.06L14.44 12l-5.72 5.72a.75.75 0 000 1.06z"></path>
            </svg>
          </span>
          <p>{{ category[0] | capitalize }}</p>
          <ul>
            {% for post in subposts %}
              <li><span><a href="{{ post.url | relative_url | remove: ".html" }}" {% unless post.setup.style %}class="internal"{% endunless %}>{{ post.title | escape }}</a> <time> / {{ post.date | date: date_format }}</time></span></li>
            {% endfor %}
          </ul>
        </li>
      {% endif %}
    {% endfor %}
  </ul>
  {% endif %}
{% endfor %}
{% endfor %}
