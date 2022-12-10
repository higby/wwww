---
title: "Inspiration"
date: 2022-11-20
---

Throughout the many versions of my personal website, I have seen and been inspiried by (and blatantly stole from) many other creator's and their websites.

I suppose this is more of a sort of blog roll - or even just a list of cool websites and even cooler people.

Whatever.

Moral is that you should check these people out:

(And I want to be very clear that there is no particular order, it is literally just thrown on here!)

<ul>
  {% for person in inspiration %}
  <li>
    <a href="{{ person.url }}">
      <span>{{ person.name }}</span>
      <br>
      <span>{{ person.url | replace("https://", "") }}</span>
    </a>
  </li>
  {% endfor %}
</ul>
