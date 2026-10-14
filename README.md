# Black Roses

A one-page site about black roses: what they are, the varieties, how to care for them, and a photo gallery.

**Live:** https://ipelengmkhize.github.io/black-roses/

## 2023 → 2026

This was the first website I built, in 2023. In 2026 I rebuilt it from scratch to show how my front-end skills have grown. The original is kept at the [`v1-2023` tag](https://github.com/ipelengmkhize/black-roses/tree/v1-2023).

| 2023 | 2026 |
|---|---|
| No `index.html`, so the site wouldn't load | Single page that loads at the repo's Pages URL |
| Clicking a photo called `openFullImg()`, which was never written | Working lightbox: click or tap, arrow keys, swipe, Esc to close |
| Broken image link; logo written as a class name | All images load; original SVG logo |
| Unclosed `<header>`/`<nav>`; gallery page had no `<head>` | Valid, semantic HTML with landmarks and a skip link |
| Fixed layout | Responsive from phone to desktop |
| Unlicensed and watermarked photos | Freely licensed photos, credited in the footer |
| — | Accessible contact form with inline validation |
| — | Responsive images (`srcset`) and lazy loading |

## Built with
HTML, CSS (custom properties, grid, `clamp()`), vanilla JavaScript (native `<dialog>`). No frameworks or build step.

## Photo credits
All photos come from Wikimedia Commons under CC BY-SA or CC0 licences. Full credits are in the site footer.
