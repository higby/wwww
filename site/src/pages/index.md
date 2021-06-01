---
layout: index
title: Branden Higby
permalink: /index.html
---

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
          <a href="{{ post.url | relative_url | remove: ".html" }}" {% unless post.setup.style %}class="internal" {% endunless %}>{{ post.title | escape }}</a> <time> {%- assign date_format = "%b %-d, %Y" -%} {{ post.date | date: date_format }}</time>
        </li>
      {% endunless %}
    {% endfor %}


    {% for category in site.categories %}
    {% assign subposts = category[1] | where: "tag",tag[0] %}
      {% if subposts.size > 0 %}
        <li>
          <span class="subtitle"><svg height="24" viewBox="0 -5 24 24" width="24" aria-hidden="true" fill="#4b4b4b"><path fill-rule="evenodd" d="M5.22 8.72a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 00-1.06-1.06L12 14.44 6.28 8.72a.75.75 0 00-1.06 0z"></path></svg> {{ category[0] | capitalize }}</span>
          <ul class="subposts">
          {% for post in subposts %}
            <li>
              <a href="{{ post.url | relative_url | remove: ".html" }} {% unless post.setup.style %}class="internal" {% endunless %}">{{ post.title | escape }}</a> <time> {%- assign date_format = "%b %-d, %Y" -%} {{ post.date | date: date_format }}</time>
            </li>
          {% endfor %}
          </ul>
          </li>
      {% endif %}
    {% endfor %}
  </ul>
  {% endif %}
{% endfor %}
{% endfor %}
