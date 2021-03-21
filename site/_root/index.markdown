---
layout: default
title: Branden Higby
---

<h2>Writing</h2>

<ul class="posts">
  {%- for post in site.writing -%}
    {% unless post.hidden %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a> <time> {%- assign date_format = "%b %-d, %Y" -%} {{ post.date | date: date_format }}</time>
      </li>
    {% endunless %}
  {%- endfor -%}
</ul>
{% if site.dev %}
<h2>Hidden Pages</h2>

<ul class="posts">
  {%- for post in site.writing -%}
    {% if post.hidden %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </li>
    {% endif %}
  {%- endfor -%}
</ul>

<h2>Drafts</h2>

<ul class="posts">
  {%- for post in site.drafts -%}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </li>
  {%- endfor -%}
</ul>

<h2>My Stuff Elsewhere</h2>

<ul class="posts">
  {%- for post in site.external -%}
      <li>
      <a href="{{ post.link | relative_url }}">{{ post.title | escape }}</a> <time> {{ post.src }}</time>
      </li>
  {%- endfor -%}
</ul>
{% endif %}
