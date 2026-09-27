# Marikitaparty company profile

Responsive static website. Open `index.html` directly, or serve this folder with any static web server. No build, external fonts, or dependencies required.

## Pages
- `index.html`: studio homepage with an animated party hero and a linked Odomo product card.
- `odomo.html`: dedicated product explanation for AI-based vehicle management, refueling, and service.
- `styles.css`: shared layout and brand tokens; content caps at 1240px on wide displays.
- `script.js`: mobile navigation, copyright year, and hero motion pause/play.

The hero uses an isolated transparent 3D piñata sprite with a CSS pendulum swing. An independent full-width canvas animates paper confetti, curled streamers, and alternating corner bursts. Each particle has its own velocity, tumble, flutter, and depth shading. Particles are subdued behind the copy. Both layers pause together; reduced-motion preferences produce a static composition. Animation also stops offscreen and in hidden tabs. The piñata is a rendered sprite, not a live 3D model. Final Blender logo exports remain the source for the site’s brand marks.

No product destination or contact details were supplied, so no external product links or contact details are invented. Odomo’s typography is a website treatment rather than a supplied product logo.

## Preview
From the repository root:

```sh
python3 -m http.server 4173 --directory website
```

Visit http://localhost:4173. Upload this folder’s contents to any static host to publish.

## Validation
Both pages checked at 320, 390, 768, 1024, 1440, 2560, and 3440px: no horizontal overflow; content remains capped on wide displays. Checked product-page navigation, mobile menu, Escape dismissal, pause/play, reduced motion, and internal anchors.

## Hero asset provenance
`assets/party-pinata.png` was generated using the built-in imagegen tool. Original output preserved in the Codex generated-images directory.

Final prompt:

> Use case: stylized-concept. Create a polished 3D website hero asset for Marikitaparty, a playful digital experience studio. A floating sculptural five-point star party piñata with layered paper fringe, predominantly electric blue #3B75FB and violet #6824C3, with pink #FD3B69, orange #FE7327 and gold #FFB63E fringe stripes. Surround it with a restrained scattering of curled satin party streamers and chunky confetti in the same palette. Sophisticated tactile 3D render, soft studio lighting, dimensional shaded edges, premium playful editorial art direction. Centered square composition with generous clear margins around all objects. Background solid deep navy #0C102E, no floor, no horizon, no cast shadow on background; edges of canvas must be pure navy to blend into website. No lettering, words, logos, watermark or UI. The star piñata is the focus, slightly tilted in three-quarter view.

## Isolated piñata update

Final asset: `assets/pinata-isolated.png` (RGBA, transparent). Edited with the built-in imagegen tool from the original party artwork. Confetti is rendered independently by the browser; no confetti remains baked into the sprite.

Final edit prompt:

> Edit the supplied image. Isolate ONLY the central five-point star piñata, preserving its exact shape, layered paper fringe texture, blue/violet/pink/orange/gold stripes, three-quarter angle, lighting and detailed 3D appearance. Remove ALL surrounding confetti and curled streamers. Remove the navy background entirely and deliver a genuinely transparent alpha background, no ground, no shadows outside the object, no other objects, no string, no text. Center the complete star in a square image with 10% transparent margin so none of its tips are cut off. This is a standalone website sprite that will swing independently above a separately animated confetti layer.
