# Qazi Saaheelur Rahaman — GitHub Pages site

A simple one-page academic website using the Sunset Ember colour palette:

- `#A23438` — ember
- `#BB5E61` — rose
- `#D99C97` — blush
- `#F3C9AF` — peach
- `#FBE3D0` — cream

## Quick deploy on GitHub Pages

### Option A — personal GitHub Pages repository

1. Create a GitHub repository named exactly:
   `YOUR_GITHUB_USERNAME.github.io`
2. Upload the contents of this folder to the repository root.
3. Commit and push to the `main` branch.
4. Open `https://YOUR_GITHUB_USERNAME.github.io/`.

GitHub normally publishes a repository with this name automatically. If it does not, go to **Repository → Settings → Pages** and choose the `main` branch, root folder.

### Option B — existing repository

Put these files in the repository root (or in a `/docs` folder) and enable GitHub Pages under **Settings → Pages**.

## What to edit

Most content is directly in `index.html` and is deliberately easy to change.

Useful places to customize:

- Name and subtitle: hero section near the top of `index.html`
- Short bio: `#about`
- Research cards: `#research`
- Publications: `#publications`
- Scientific activities: `#highlights`
- Email/contact links: search for `saaheelur-rahaman.QAZI@univ-amu.fr`
- Google Scholar URL: search for `FJB0mhMAAAAJ`
- Turing pattern presets and simulation: `pattern-lab.js`

## Profile photo

The hero portrait uses `assets/img.jpeg`. Replace that file to change the photo.

## Pattern lab

The bottom section runs a small Gray–Scott reaction–diffusion simulation in the browser. Visitors can choose a preset, change feed, kill, diffusion and speed, pause or restart, and draw new seeds on the canvas. It uses plain JavaScript and needs no external library.

## CV

The current CV is included at:

`assets/resume.pdf`

Replace this PDF whenever you update your CV; the website button will continue to work.

## Local preview

From this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
