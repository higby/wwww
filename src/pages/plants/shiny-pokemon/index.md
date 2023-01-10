---
title: 'Shiny Pokemon'
description: 'My collection of shiny Pokemon'
date: 2021-04-06
tags: ['list']
redirects: ['pokemon']
---

## Caught

<ul class="box">
  {% for pokemon in caught %}
  <li class="pokemon">
    <div class="sprites">
      <img src='/pokemon/balls/{{ pokemon.stats.ball | slugify }}.png' alt='Pokeball'>
      <img src='/pokemon/{{ pokemon.name | slugify }}.png' alt='Pokemon'>
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
      <img src='/pokemon/{{ pokemon.name | slugify }}.png' alt='Pokemon'>
    </div>
    <span><b>{{ pokemon.name }}</b> the {{ pokemon.species }}</span>
    <br>
    <span>Hunting in {{ pokemon.stats.original_game }}</span>
  </li>
  {% endfor %}
</ul>
