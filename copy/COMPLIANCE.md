# Requirement compliance report

Scope: the static website in this folder. The original site is unchanged in the parent folder.

## Implemented

- Ten pages: Home, Features, Getting Started, Managing Your Collection, Search/Sort/Filter, Collection Statistics, Import & Export, Download, About the Project, and Contact.
- Shared header, navigation, footer, design tokens, buttons, cards, screenshot frames, panels, FAQ accordions, and page navigation.
- Desktop-first responsive layouts, tested at 390, 1024, 1280, 1920, and 3840 px.
- Clearly labelled placeholder screenshots and illustrations, including app windows, card art, file dialogs, charts, and team avatars.
- Problem/solution framing, feature explanations, user guides, and a plain-language explanation of the app’s limits (local, single-user, no marketplace, no market values, no accounts).
- Interactive search/sort/filter demonstration with sample data, active-filter chips, reset behaviour, and a live result count.
- Illustrative statistics dashboard with three datasets, a donut chart, a bar chart, a legend, a data table, and accessible descriptions.
- Configurable product name, version, supported systems, download URL, repository URL, and feature status in `assets/js/site-config.js`.
- Download page with an honest unavailable state; no fake file or dead download link.
- Contact form with required-field, email, phone-format, and message-length validation, inline errors, focus management, and a “not sent” state when no endpoint is configured.
- Social metadata, favicon, unofficial-project disclaimer, and self-hosted fonts.
- Accessibility measures: semantic headings, skip link, visible focus, labelled controls, image alt text, colour contrast checked against WCAG AA, and reduced-motion support.

## Tested

- HTML structure, duplicate IDs, inline styles, missing alt text, and local link/image targets: all pages pass.
- JavaScript syntax and browser smoke tests: search/filter/sort, statistics dataset switching, contact validation, download CTA replacement, mobile navigation, and page-error checks.
- Horizontal overflow: none at 390, 1024, 1280, 1920, or 3840 px.
- Contrast: body and interface text pairs meet 4.5:1; the palette was adjusted where needed.
- Navigation and guide anchors resolve.

## Pending or dependent on missing material

- **Release file:** no application download exists yet. The download buttons intentionally show “Download not yet available”.
- **Supported systems, Java runtime, and packaging:** not confirmed; the Download page says so instead of inventing requirements.
- **Final application screenshots:** placeholders are in place and labelled; replace the SVG files when real screenshots exist.
- **Team names and photographs:** placeholder avatars and roles; replace them when the team confirms details.
- **Application feature verification:** core features are described as “In the app” based on the project plan, but the first public release is unpublished, so this has not been verified against a shipped build.
- **Contact delivery:** no endpoint is configured. The form validates and prepares a copyable message; it does not claim delivery.
- **Separate application repository:** the known repository is linked as the project website repository; add the application source or release link when available.
- **Formal usability testing:** not conducted. No testimonial, download count, price, guarantee, or security certification has been invented.

## Notes

- Statistics and import/export are planned features, not part of the current build. They are labelled “Planned” where presented.
- The card catalogue/collection distinction, duplicate handling, conditions, variants, sorting rules, and import/export warnings follow the supplied specification.
- The site is an unofficial student project and is not affiliated with Nintendo, Creatures Inc., GAME FREAK inc., or The Pokémon Company.
