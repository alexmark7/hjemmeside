# Binderly — website

A static, ten-page website for Binderly, a SEP1 student project: a local desktop collection manager for Pokémon card collectors. No build step, no backend, no package install.

## View the site

- **GitHub Pages (live):** <https://alexmark7.github.io/hjemmeside/copy/>

To view locally, open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

The original website remains in the parent folder. This folder is the independent copy.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| Features | `features.html` |
| Getting started | `getting-started.html` |
| Managing your collection | `managing-your-collection.html` |
| Search, sort & filter | `search-sort-filter.html` |
| Collection statistics | `statistics.html` |
| Import & export | `import-export.html` |
| Download | `download.html` |
| About the project | `about.html` |
| Contact | `contact.html` |

## Configuration

Edit `assets/js/site-config.js`:

- `productName`, `tagline`, `version`, `supportedOS` — injected into the pages.
- `downloadUrl` — set to a real release URL to enable the download buttons. While it is `null`, the buttons become “Download not yet available”.
- `repositoryUrl` — used by every repository link.
- `contactEndpoint` — set to a POST endpoint to send the contact form. While it is `null`, the form validates and prepares a copyable message without claiming to send it.
- `featureStatus` — `core`, `should`, or `could`. Core (“In the app”) labels are hidden outside the About comparison table; planned features show a small “Planned” label.

## Replacing placeholder images

All placeholders are labelled SVG files in `assets/img/placeholders/`. Replace a file with a real image of the same aspect ratio, or update the `src` in the page. The main sizes are:

- Application screenshots: 1600 × 900 (16:9)
- Card art: 600 × 840 (5:7)
- Illustrations: 1200 × 800 (3:2)
- Team avatars: 500 × 500

`assets/img/og-cover.png` is the social-sharing image, and `assets/img/favicon.svg` is the browser icon. The placeholder card art is original illustration, not official Pokémon card artwork.

## Structure

- `assets/css/main.css` — shared design system and components.
- `assets/css/pages/` — small page-specific additions.
- `assets/js/site-config.js` — central configuration.
- `assets/js/site.js` — navigation, active page, config injection, release states.
- `assets/js/search-demo.js` — sample search/sort/filter demonstration.
- `assets/js/stats.js` — sample statistics charts.
- `assets/js/contact.js` — contact validation and message preparation.
- `assets/img/fonts/` — Syne, DM Sans, and Caveat (self-hosted).

## Current status

The first public release has not been published. Statistics, import/export, manual card creation, local card images, catalogue updates, and collection merging are planned and labelled as such. The download and contact features are intentionally not connected. See `COMPLIANCE.md` for the requirement report.
