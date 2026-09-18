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

The bottom section runs a cat-catching game over a small Gray–Scott reaction–diffusion simulation. Each catch adds a new seed to the pattern; five catches win a round. Visitors can also choose a preset, change feed, kill, diffusion and speed, pause or restart, and draw new seeds on the canvas. It uses plain JavaScript and needs no external library.

## Miscellaneous page

`misc.html` shows favourite movies, anime and manhwa, with a link to Letterboxd. The 12 supplied covers live in `assets/movies`, `assets/anime` and `assets/manhwas`. Their original files stay intact; `style.css` applies grayscale, a red wash and a grain layer at 46% opacity to every cover. The shared grain texture is `assets/poster-grain.svg`.

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
