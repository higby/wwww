---
title: "Pokemon"
date: 2021-04-06 00:18:46 -0800
description: "Branden Higby's Wonderful Pokemon Collection"
setup:
  date: hidden
tags: collections
---

<div class="boxList">
{% for pokemon in site.data.pokemon %}
  <div id="{{pokemon.name | downcase}}" class="box">
    <div class="imgHolder">
    <img width="32" height="32" class="ball" src="../assets/images/pokemon/balls/{{pokemon.ball | slugify }}.png">
      <img width="512" height="512" class="poke" id="{{ pokemon.name | slugify }}" src="../assets/images/pokemon/{{pokemon.name | slugify }}.png">
    </div>
    <span><b>{{pokemon.name}}</b> - <i>{{pokemon.species}}</i></span>
    <span>Caught: <i>{{pokemon.original_game}}</i></span>
  </div>
{% endfor %}
</div>
