---
title:  "Pokemon"
date: 2021-04-06 00:18:46 -0800
setup:
  style: poke
  date: hidden
tags: collections
hidden: true
---
<div class="cardList">
{% for pokemon in site.data.pokemon %}
  <div id="{{pokemon.name | downcase}}" class="card">
    <div class="imgHolder">
    <img class="ball" src="../assets/images/pokemon/balls/{{pokemon.ball | slugify }}.png">
      <img class="poke" src="../assets/images/pokemon/{{pokemon.name | slugify }}.png">
    </div>
    <span>{{pokemon.name}}</span> - <span><i>{{pokemon.species}}</i></span>
  </div>
{% endfor %}
</div>
