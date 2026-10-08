# Marikitaparty company profile

Responsive static website. Open `index.html` directly, or serve this folder with any static web server. No build or runtime dependencies required. Odomo's wordmark uses Quicksand from Google Fonts with a local fallback.

## Pages
- `index.html`: company homepage with an animated party hero and portfolio cards for Odomo and Forever QR.
- `about.html`: dedicated About page with the founder, founding month, location, contact details, and Organization structured data.
- `odomo.html`: dedicated product explanation for AI-based vehicle management, refueling, and service.
- `styles.css`: shared layout and brand tokens; content caps at 1240px on wide displays.
- `script.js`: mobile navigation, copyright year, and hero motion pause/play.

The hero uses an isolated transparent 3D piñata sprite with a CSS pendulum swing. An independent full-width canvas animates paper confetti, curled streamers, and alternating corner bursts. Each particle has its own velocity, tumble, flutter, and depth shading. Particles are subdued behind the copy. Both layers pause together; reduced-motion preferences produce a static composition. Animation also stops offscreen and in hidden tabs. The piñata is a rendered sprite, not a live 3D model. Final Blender logo exports remain the source for the site’s brand marks.

The About page identifies founder Rahmat Nugraha, the founding month January 2023, Indonesia, and the business contact `rahmat@marikita.party`, alongside matching Organization structured data. The founder clarified on 8 October 2026 that the software business began in January 2023; December 2019 was the original domain registration. Odomo links point to https://odomo.marikita.party/, which contains app previews and a product walkthrough. The Forever QR portfolio card links to https://foreverqr.marikita.party/ and uses `assets/foreverqr-preview.jpg`, a screenshot of the live invitation captured on 8 October 2026. Navigation and footer links connect all three local pages.

### Domain history

- Original registration: **19 December 2019, 14:28:44**, through **Alibaba Cloud**, as reported by the founder from the registrar record on 8 October 2026. The record's timezone has not been confirmed; do not convert this timestamp or append a timezone without checking the original record.
- Earlier use is independently supported by an [Internet Archive capture of a subdomain on 31 May 2024](https://web.archive.org/web/20240531075732/https://foreverqr.marikita.party/). This supports earlier domain use, not the company's founding date.
- Current registration: checked on 8 October 2026, the [authoritative .party RDAP record](https://rdap.nic.party/domain/marikita.party) reports registration at `2026-05-28T05:27:49Z` (28 May 2026, 12:27:49 WIB). Registry and Cloudflare WHOIS records agree. The founder confirms this registration followed expiry of the earlier registration.

Domain registration and re-registration dates do not establish the company's founding or incorporation date. The founder clarified that Marikitaparty began operating as a software business in **January 2023**, correcting the earlier December 2019 founding statement, which referred to the original domain registration. Public copy and the Organization description use January 2023; no exact founding day or legal incorporation date is asserted. The May 2024 archive independently confirms that Forever QR was online by then, but is not the source for the business founding month.

## Preview
From the repository root:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Visit http://localhost:4173. Upload this folder’s contents to any static host to publish.

The `deploy` and `deploy:preview` npm scripts stage `index.html`, `about.html`, `odomo.html`, the shared CSS/JavaScript, and all assets for Cloudflare Pages.

## Validation
The About and portfolio update was checked on all three pages at 320, 390, 768, and 1440px, including horizontal overflow, loaded images, navigation, relative links, fragment targets, structured data, and deployment file inclusion. The existing site previously had broader viewport and motion-control checks.

## Hero asset provenance
`assets/party-pinata.png` was generated using the built-in imagegen tool. Original output preserved in the Codex generated-images directory.

Final prompt:

> Use case: stylized-concept. Create a polished 3D website hero asset for Marikitaparty, a playful digital experience studio. A floating sculptural five-point star party piñata with layered paper fringe, predominantly electric blue #3B75FB and violet #6824C3, with pink #FD3B69, orange #FE7327 and gold #FFB63E fringe stripes. Surround it with a restrained scattering of curled satin party streamers and chunky confetti in the same palette. Sophisticated tactile 3D render, soft studio lighting, dimensional shaded edges, premium playful editorial art direction. Centered square composition with generous clear margins around all objects. Background solid deep navy #0C102E, no floor, no horizon, no cast shadow on background; edges of canvas must be pure navy to blend into website. No lettering, words, logos, watermark or UI. The star piñata is the focus, slightly tilted in three-quarter view.

## Isolated piñata update

Final asset: `assets/pinata-isolated.png` (RGBA, transparent). Edited with the built-in imagegen tool from the original party artwork. Confetti is rendered independently by the browser; no confetti remains baked into the sprite.

Final edit prompt:

> Edit the supplied image. Isolate ONLY the central five-point star piñata, preserving its exact shape, layered paper fringe texture, blue/violet/pink/orange/gold stripes, three-quarter angle, lighting and detailed 3D appearance. Remove ALL surrounding confetti and curled streamers. Remove the navy background entirely and deliver a genuinely transparent alpha background, no ground, no shadows outside the object, no other objects, no string, no text. Center the complete star in a square image with 10% transparent margin so none of its tips are cut off. This is a standalone website sprite that will swing independently above a separately animated confetti layer.
