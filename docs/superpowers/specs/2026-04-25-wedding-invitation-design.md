# Wedding Invitation Design

## Context

Single-page wedding invitation website for GitHub Pages using plain HTML, CSS, and JavaScript. The design is based on a Figma mockup but may be simplified where it improves performance, responsiveness, or maintainability.

## Goals

- Build a fast-loading static wedding invitation page.
- Support both mobile and desktop layouts.
- Preserve a soft, warm wedding mood with decorative accents.
- Keep the codebase simple enough for iterative edits without framework overhead.

## Constraints

- Tech stack: HTML, CSS, JavaScript only.
- Hosting target: GitHub Pages.
- Prioritize performance over pixel-perfect fidelity to the mockup.
- Functional external links should remain simple anchor links.
- The implementation should work even before final production links and phone numbers are available.

## Content Structure

The page is a vertical sequence of sections:

1. Hero
   - Background image across the page.
   - Sparse decorative leaves on the sides.
   - Title: "Мы женимся!"
   - Secondary line: "невеста жених"
   - Couple photo.
   - Names: "Надя + Паша"
   - Introductory invitation text.

2. Date
   - Section title: "наш июнь"
   - Compact calendar illustration with a heart on June 13.

3. Location
   - Section title: "локация"
   - Venue photo.
   - Map action linking to 2GIS.
   - Venue text:
     - "Площадка White Garden"
     - "ул. Павла Морозова, 79/5"

4. Timeline
   - Section title: "Тайминг"
   - Events:
     - 16:30 Сбор гостей
     - 17:00 Церемония
     - 18:00 Банкет
     - 23:00 Окончание

5. Dress Code
   - Section title: "дресс-код"
   - Description text.
   - Dress code image.
   - Palette circles:
     - #5C4734
     - #856A57
     - #D8CCB4
     - #AEBEA4
     - #5E6846

6. Wishes
   - Section title: "пожелания"
   - Gift and flower guidance text.

7. Details
   - Section title: "детали"
   - Organizer subsection with phone action using `tel:`
   - Chat subsection with temporary placeholder link

8. Countdown
   - Heading: "Мы скажем друг другу “да” через..."
   - Live countdown to June 13, 2026 at 17:00

9. RSVP
   - Section title: "подтвердите присутствие"
   - Confirmation text with deadline 15.05.26
   - CTA button linking to `https://google.com` until final form is provided

10. Closing
   - Closing line: "Обнимаем и ждём, Надя и Паша"

## Visual System

- Warm light background using the provided `background.jpg`.
- Decorative side leaves should be sparse, with at most one noticeable leaf accent per viewport height.
- Heading typography uses `Everlasting` with graceful, romantic emphasis.
- Body and interface typography uses `Montserrat Alternates` with strong readable weight.
- Layout should feel airy, with generous spacing and restrained ornament.
- Content cards and section containers may use subtle translucency, warm borders, or soft shadows if they remain lightweight and readable.

## Responsive Behavior

- Use a mobile-first layout.
- On mobile, sections stack in a single narrow column.
- On desktop, widen the content container and allow selective two-column arrangements for media and text where it improves scanning.
- Decorative elements must not overlap important text or interactive controls.

## Motion and Interaction

- Leaves may use a subtle swaying animation.
- Sections should fade or slide in lightly on scroll using `IntersectionObserver`.
- Countdown updates live on the client.
- Buttons and links should use lightweight hover/tap feedback only.
- No heavy third-party embeds in the first version.

## External Integrations

- Map: open 2GIS in a new tab using a direct venue link.
- Chat: temporary placeholder link until the real Telegram URL is available.
- Organizer: `tel:+79998887766`
- RSVP: temporary `https://google.com`

## Assets

Provided assets in `.for-codex`:

- `background.webp`
- `children_photo.webp`
- `dress.webp`
- `leaf.webp`
- `place.webp`

## Technical Structure

- `index.html` contains the semantic section markup.
- `styles.css` contains typography, layout, color system, responsiveness, and animations.
- `script.js` contains the countdown logic and reveal-on-scroll behavior.

## Performance Strategy

- Keep JavaScript minimal and dependency-free.
- Prefer CSS effects over JS animation where possible.
- Use semantic HTML and small DOM depth.
- Reuse shared utility classes instead of one-off styling patterns.
- Avoid embedded iframes for maps in the first version.

## Open Items

- Replace placeholder Telegram link when available.
- Replace temporary RSVP link when Google Form is provided.
- Confirm availability of the `Everlasting` font file; otherwise use a temporary fallback until the final font is supplied.
