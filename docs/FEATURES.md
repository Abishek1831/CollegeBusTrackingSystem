# Features

A closer look at what the dashboard does, based on the actual code in
`assets/js/script.js`.

## Live map & tracking

- Each route has a fixed list of stops (name + coordinates) defined in
  `routeDefinitions`, ending at the college (`REC_COLLEGE` coordinates).
- When GPS data for a route appears in Firebase, the dashboard:
  - Marks the route `active` and stores its live coordinates and speed
  - Recalculates which stop the bus is closest to, and marks earlier stops
    `passed`, the current one `current`, and the rest `upcoming`
  - Computes an ETA to the next stop from distance and current speed
    (using the Haversine formula for great-circle distance)
  - Computes an overall route-completion percentage
- If a route stops sending GPS updates, it's automatically marked `offline`
  again.
- Selecting a route from the sidebar opens a live map (Leaflet) showing the
  bus marker, the route line/routing to remaining stops, and colored stop
  markers (grey = upcoming, dark blue = current, green = passed).

## Route sidebar

- Lists every configured route with a live status badge (🟢 Active /
  ⚫ Offline), current speed, current location, a mini progress bar, and ETA.
- **Search** — filter routes by route number or location text as you type.
- **Filters** — quickly switch between All / Active / Offline routes.
- **Favorites** — star a route to save it (in `localStorage`); a
  "Favorites" filter shows only starred routes.

## Notifications

- Uses `toastr.js` for toast notifications (falls back to `console.log` if
  the library isn't loaded).
- If notifications are enabled and a route is favorited, the dashboard shows
  a toast when that bus:
  - Comes online (was offline, now has live GPS)
  - Passes a stop
  - Returns to its starting point (completes/resets its route)

## Stats bar

Three live stats computed from currently active routes:
- **Active Buses** — count of routes currently reporting GPS
- **Avg Distance** — average straight-line distance of active buses from
  the college
- **Avg Speed** — average current speed of active buses

## Share

- "Share" on a selected active bus builds a text summary (route, location,
  speed, distance, ETA, progress) and opens a modal with:
  - **Copy Link** — copies the summary text to the clipboard
  - **WhatsApp** — opens a WhatsApp share link pre-filled with the summary

## Theme

- Light/dark mode toggle, persisted in `localStorage` and applied via a
  `data-theme` attribute (see the CSS custom properties in
  `assets/css/styles.css`).
- Switching theme also swaps the Leaflet map tile layer between light and
  dark CartoDB basemaps.

## Mobile behavior

- On small screens, selecting a route opens the details panel full-screen,
  with a back button (and browser back-button support via
  `history.pushState`) to return to the route list.

## Top bar actions

- **Website** — opens the college transport website in a new tab
- **Helpline** — shows contact numbers/email in a simple alert dialog
- **Theme toggle** and **Share** — as described above
