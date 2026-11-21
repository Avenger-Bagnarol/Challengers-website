# HAT Challengers

The official HAT Challengers website: a static, English-language introduction to tournaments and events dedicated to the Yu-Gi-Oh! HAT format.

## Preview locally

Open `index.html` directly in a browser. No installation, build step, network connection, or backend is required.

Alternatively, from the repository root run:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000. Stop the server with Ctrl+C.

## Structure

- `index.html` — homepage
- `pages/future-events.html` — upcoming events and announcements
- `pages/ranking.html` — standings table and empty state
- `pages/team.html` — organizers and contributors
- `pages/collab.html` — collaboration information and contact placeholder
- `css/styles.css` — shared palette, typography, components, and responsive layouts
- `js/main.js` — progressive enhancement for the mobile navigation
- `assets/logo_challengers.png` — circular HAT Challengers logo

All pages use ordinary relative links and share the same CSS and JavaScript. Header and footer markup is deliberately present in every HTML document so the full site also works without JavaScript and when opened directly from disk. When changing navigation or footer copy, update all five documents together.

## Adding content

Replace the relevant page's empty state with confirmed content. The events and team pages include empty grids and comments describing the expected fields. Use `.event-grid` / `.team-grid` as containers and add styles when real content is available. Add standings rows to the ranking table's `tbody`, replacing the placeholder row. Replace collaboration contact copy once an official channel is provided.

Do not publish placeholder people, results, or event details as real data. There are no registration, ranking calculation, or contact submission systems in this initial version.

Fonts use local system stacks; there are no external font requests, services, or dependencies. Reduced-motion preferences, keyboard focus, a skip link, and a mobile menu are supported. Without JavaScript, mobile navigation remains visible.

Development is local only. No deployment configuration is included.
