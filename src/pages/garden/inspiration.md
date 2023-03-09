---
title: 'Inspiration'
date: 2022-11-20
tags: ['list']
redirect: 'inspiration'
---

Throughout the many versions of my personal website, I have seen and been inspired by (and blatantly stole from) many other creator's and their websites.

I suppose this is more of a sort of blog roll - or even just a list of cool websites and even cooler people.

Whatever.

Moral is that you should check these people out:

(And I want to be very clear that there is no particular order, it is literally just thrown on here!)

<ul class='inspiration' role='list'>
  {% for person in inspiration %}
  <li class='card'>
    <a href="{{ person.url }}">
      <span class='name'>{{ person.name }}</span>
      <span class='website'>{{ person.url | replace: "https://", "" }}</span>
    </a>
  </li>
  {% endfor %}
</ul>

{% stylesheet %}
ul.inspiration {
  @include full-margins;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  li {
    background-color: var(--foreground);
    border-radius: .25rem;
    transition: background-color 0.5s;
    &:hover {
      background-color: var(--hover);
    }
  }
  a {
    display: grid;
    gap: .25rem;
    padding: 0.75rem 1rem;
    &:hover {
      text-decoration: none;
    }
  }
  .website {
    color: var(--text-subtle);
    font-size: .95rem;
  }
  @media (max-width: $body-width) {
    grid-template-columns: 1fr;
    margin: 0;
    width: 100%;
    li {
      border-radius: 0;
    }
  }
}
{% endstylesheet %}
