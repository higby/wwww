---
title:  "Sliver Deck"
date: 2021-02-26 00:05:00 -0800
setup:
  style: magic
  date: hidden
tags: collections
---

{% capture allTypes %}{% for card in site.data.slivers %}{{ card.type }},{% endfor %}{% endcapture %}
{% assign types = allTypes | split: "," | uniq %}

{% for type in types %}
## {{type}}
  <div id="{{type | downcase}}list" class="cardList">
    {% for card in site.data.slivers %}
    {% if card.type == type %}
      {% if card.amount %}
        {% for i in (1..card.amount) %}
          <div id="{{card.name | downcase}}" class="card">
            <img src="../assets/images/cards/sliver/sliver-{{card.name | slugify: "pretty" }}-{{i}}.jpeg">
            <span>{{card.name}}</span>
          </div>
        {% endfor %}
      {% else %}
        <div id="{{card.name | downcase}}" class="card">
          <img src="../assets/images/cards/sliver/{{card.name | slugify: "pretty" }}.jpeg">
          <span>{{card.name}}</span>
        </div>
      {% endif %}
    {% endif %}
    {% endfor %}
  </div>
{% endfor %}
