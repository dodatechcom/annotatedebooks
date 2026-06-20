---
title: Annotated Book
toc: false
width: wide
---

<style>
  .home-read-books { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
  .home-read-card { display: block; flex: 1; min-width: 280px; max-width: 380px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; text-align: center; text-decoration: none; color: inherit; transition: box-shadow 0.2s; }
  .home-read-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  .home-read-card h3 { margin: 0.5rem 0 0.25rem; font-size: 1.2rem; }
  .home-read-card p { margin: 0; color: #666; font-size: 0.9rem; }
  .home-read-btn { display: inline-block; margin-top: 0.75rem; padding: 0.4em 1.2em; border: 2px solid #1a5276; border-radius: 4px; color: #1a5276; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; text-decoration: none; }
  .home-read-btn:hover { background: #1a5276; color: #fff; }
</style>

<div class="home-read-books">
  <a class="home-read-card" href="/books/pride-and-prejudice/reader/">
    <h3>Pride and Prejudice</h3>
    <p>Jane Austen</p>
    <span class="home-read-btn">Read Now</span>
  </a>
  <a class="home-read-card" href="/books/declaration-of-independence/reader/">
    <h3>Declaration of Independence</h3>
    <p>Thomas Jefferson</p>
    <span class="home-read-btn">Read Now</span>
  </a>
</div>

{{< cards >}}
  {{< card link="books" title="All Books" subtitle="Browse all free annotated editions" icon="book-open" >}}
  {{< card link="about" title="About" subtitle="How this site works — free reading, premium EPUBs" icon="information-circle" >}}
{{< /cards >}}
