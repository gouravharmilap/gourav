# Gourav Kumar — Ethical Hacker Portfolio

A responsive, single-page portfolio website for an ethical hacker / security researcher.

## Structure
- `index.html` — page content (edit placeholders: projects, bio, skills, email)
- `styles.css` — design tokens and layout
- `script.js` — theme toggle, nav, animations, copy-email
- `assets/favicon.svg`

## Quick start
Open `index.html` in a browser, or serve locally:

```bash
cd gourav-portfolio
python -m http.server 8000
```
Then visit http://localhost:8000

## Things to edit first
- Projects in `#work` (title, one-liner, tags, impact, links, thumbnail gradient)
- About bio in `#about`
- Stats/facts in `.about-panel`
- Skills in `#skills`
- Email addresses (`mailto:` and `data-email`)
- GitHub URL in `.hero-social`
- LinkedIn URL is already set: https://www.linkedin.com/in/gourav-bajwa-5b4453447
- Hero role/subtitle

## Deploy
Drop the folder into any static host (Vercel, Netlify, GitHub Pages). No build step required.
