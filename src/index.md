---
title: of the world
layout: "base.njk"
---
<div class="container">
{% for item in airtableData %}
  <article>
    <div class="card">
       <div class="card-image waves-effect waves-block waves-light">
      <img class="activator"  src="{{ item.Pictures_Url }}">
    </div>
      <p><a href="{{ item.Link }}">{{ item.Link_Title }}</a></p>
      <p>{{ item.Status }}</p>
    </div>
  </article>
{% endfor %}
</div>
