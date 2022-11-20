---
title: "Shiny Pokemon"
description: "My collection of shiny Pokemon"
date: 2021-04-06
---

## Caught

<ul class="box">
  {% for pokemon in caught %}
  <li class="pokemon">
    <div class="sprites">
      {% image ['pokemon/balls/',pokemon.stats.ball | slug,'.png'] | join, 'Pokeball' %}
      {% image ['pokemon/',pokemon.name | slug,'.png'] | join, 'Pokeball' %}
    </div>
    <span><b>{{ pokemon.name }}</b> the {{ pokemon.species }}</span>
    <br>
    <span>Caught in {{ pokemon.stats.original_game }}</span>
  </li>
  {% endfor %}
</ul>

## Hunting

<ul class="box">
  {% for pokemon in hunting %}
  <li class="pokemon">
    <div class="sprites">
      {% image ['pokemon/',pokemon.name | slug,'.png'] | join, 'Pokeball' %}
    </div>
    <span><b>{{ pokemon.name }}</b> the {{ pokemon.species }}</span>
    <br>
    <span>Hunting in {{ pokemon.stats.original_game }}</span>
  </li>
  {% endfor %}
</ul>
