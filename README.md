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
- Email/contact links: search for `qazisr20@iiserbpr.ac.in`
- Google Scholar URL: search for `FJB0mhMAAAAJ`

## Add a profile photo later

The current design uses a `QSR` monogram, so it works immediately without a photo.

If you later want a photo, add `assets/profile.jpg` and replace the `div` with class `monogram` by an image. Example:

```html
<img class="profile-photo" src="assets/profile.jpg" alt="Qazi Saaheelur Rahaman" />
```

Then add to `style.css`:

```css
.profile-photo {
  width: 148px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 42% 58% 55% 45% / 45% 44% 56% 55%;
}
```

## CV

The current CV is included at:

`assets/Qazi_Saaheelur_Rahaman_CV.pdf`

Replace this PDF whenever you update your CV; the website button will continue to work.

## Local preview

From this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
