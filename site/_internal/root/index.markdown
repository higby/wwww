---
layout: default
title: Branden Higby
---

{% assign sorted_list = "essays,poetry,collections,stories,comics,programming,misc" | split: "," %}
{% for current_tag in sorted_list %}
{% for tag in site.tags %}
{% if tag[0] == current_tag %}
  <h2 class="postTitle">{{ tag[0] | capitalize }}</h2>
  <ul class="posts">
    {% for post in tag[1] %}
      {% unless post.hidden %}
        <li>
          <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>{% if post.draft %} <code class="language-plaintext highlighter-rouge">draft</code>{% endif %} <time> {%- assign date_format = "%b %-d, %Y" -%} {{ post.date | date: date_format }}</time>
        </li>
      {% endunless %}
    {% endfor %}
  </ul>
{% endif %}
{% endfor %}
{% endfor %}
{% if site.dev %}
  <h2 class="postTitle"><code class="language-plaintext highlighter-rouge">Hidden</code></h2>

  <ul class="posts">
    {%- for post in site.internal -%}
      {% if post.hidden or post.root %}
        <li>
          <a href="{{ post.url | relative_url }}">{{ post.title | escape | replace: "Branden Higby", "index" }}</a>
        </li>
      {% endif %}
    {%- endfor -%}
  </ul>
{% endif %}
