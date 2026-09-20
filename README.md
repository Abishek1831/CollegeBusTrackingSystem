# REC Live Bus Tracking

A real-time bus tracking dashboard for Rajalakshmi Engineering College (REC)
Transport, built with plain HTML, CSS, and JavaScript. It shows live GPS
positions of college buses on a map, with route progress, ETA, and stop-by-stop
status, updated in real time via Firebase.

## Overview

Students and staff need a quick way to see where their bus is and when it will
arrive, without calling the transport office. This project is a lightweight,
static web dashboard — no backend server or build step required — that:

- Reads live GPS positions from a **Firebase Realtime Database**
- Plots buses and their routes on an interactive **Leaflet** map
- Calculates progress, distance, and ETA on the fly
- Lets users search, filter, and favorite routes, with optional notifications

This repository contains the **dashboard (viewer) only**. Something else —
a phone in the bus, a GPS tracker device, or a driver-facing app — needs to
write live coordinates into the same Firebase database for this dashboard to
show real-time data (see [How buses report GPS data](#how-buses-report-gps-data)
below).

## Key Features

- 🗺️ **Live map view** — bus position, route line, and stops on an
  interactive Leaflet map, with light/dark map tiles
- 🚌 **Route sidebar** — all routes at a glance, with live status
  (active/offline), current speed, and progress bar
- 🔍 **Search & filters** — search by route number or location, filter by
  active/offline, and save routes as favorites (stored in the browser)
- ⏱️ **ETA & progress** — distance-based ETA and route completion percentage,
  recalculated as new GPS data arrives
- 🔔 **Smart notifications** — optional toast notifications when a favorited
  bus becomes active or reaches a stop
- 📤 **Share** — share a bus's current status via copy-link or WhatsApp
- 🌙 **Dark mode** — persisted per-browser via `localStorage`
- 📱 **Responsive layout** — usable on both desktop and mobile, with a
  full-screen details view on small screens

See [`docs/FEATURES.md`](docs/FEATURES.md) for a more detailed walkthrough.

## How It Works

```
GPS source (bus device / driver app — not included in this repo)
        │  writes live coordinates
        ▼
Firebase Realtime Database   (path: /buses/{routeId})
        │  firebase.database().ref('buses').on('value', ...)
        ▼
This dashboard (index.html + assets/js/script.js)
        │  renders on
        ▼
Leaflet map + route sidebar in the browser
```

Each route is pre-defined in `assets/js/script.js` (`routeDefinitions`) with
its stops and coordinates. When GPS data appears in Firebase under
`buses/<routeId>` with `{ latitude, longitude, speed, busCode }`, the
dashboard marks that route "active," moves its marker, and recalculates
progress and ETA against the pre-defined stops.

### How buses report GPS data

This repository does not include a GPS transmitter. To make the dashboard
show live buses, write documents to your Firebase Realtime Database at:

```
/buses/<routeId>
{
  "latitude": 13.0088,
  "longitude": 80.0025,
  "speed": 32,
  "busCode": "TN-01-AB-1234"
}
```

`<routeId>` must match one of the keys in `routeDefinitions` in
`assets/js/script.js` (currently `"1"` through `"6"`). Any device or app that
can call the Firebase Realtime Database REST API or SDK (a phone running a
simple GPS-forwarding app, a hardware GPS/GSM tracker, etc.) can act as the
source — that part is intentionally outside the scope of this repository.

## Technology Stack

| Piece | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties for theming, no framework) |
| Logic | Vanilla JavaScript (no build step, no framework) |
| Live data | [Firebase Realtime Database](https://firebase.google.com/docs/database) |
| Map | [Leaflet](https://leafletjs.com/) + [Leaflet Routing Machine](https://github.com/perliedman/leaflet-routing-machine) |
| Notifications | [toastr.js](https://github.com/CodeSeven/toastr) |
| Map tiles | [CartoDB](https://carto.com/) light/dark basemaps via OpenStreetMap |

All third-party libraries are loaded via CDN in `index.html` — there is
nothing to install or build.

## Project Structure

```
bus-tracking/
├── index.html                  
├── assets/
│   ├── css/
│   │   └── styles.css          
│   └── js/
│       ├── firebase-config.js 
│       └── script.js           
├── docs/
│   └── FEATURES.md            
├── README.md
├── SECURITY.md
├── LICENSE
└── .gitignore
```

## Installation / How to Run

No build tools, no `npm install`, no server-side code — this is a static
site. Pick any of these:

### Option 1: Just open the file
Double-click `index.html` (or right-click → Open With → your browser).
This works for a quick look, but some browsers restrict certain features for
`file://` pages, so a local server (Option 2) is recommended.

### Option 2: Run a local static server (recommended)

Using Python (comes preinstalled on most systems):
```bash
cd bus-tracking
python3 -m http.server 8000
```
Then open **http://localhost:8000** in your browser.

Using Node.js:
```bash
cd bus-tracking
npx serve .
```

Using VS Code: install the **Live Server** extension, right-click
`index.html`, and choose **Open with Live Server**.

### Option 3: Deploy it as a static site
Since this is plain HTML/CSS/JS, you can deploy it as-is to any static
hosting service — GitHub Pages, Netlify, Vercel, or Firebase Hosting (a
natural fit, since it already uses Firebase). No environment variables or
server configuration are required.

### Connecting your own Firebase project (optional)

The dashboard ships pointing at an existing Firebase project. To use your
own:

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
   and enable **Realtime Database**.
2. Copy your project's config (Project Settings → General → Your apps → SDK
   setup and configuration).
3. Paste it into `assets/js/firebase-config.js`, replacing the existing
   `firebaseConfig` object.
4. Set up Realtime Database rules and start writing bus data to `/buses/...`
   as described above.

## Screenshots

_Add screenshots of the dashboard (route list, live map view, dark mode) here
once available._

| Route List | Live Map | Dark Mode |
|---|---|---|
| _screenshot placeholder_ | _screenshot placeholder_ | _screenshot placeholder_ |

## Future Improvements

- Add a lightweight GPS-transmitter reference app/script (e.g. a simple
  browser page using the Geolocation API) so the tracking loop is complete
  out of the box
- Move `routeDefinitions` (routes/stops) into Firebase or a JSON config file
  instead of hardcoding them in `script.js`, so routes can be edited without
  touching code
- Pin `leaflet-routing-machine` to a specific version instead of `@latest`,
  so a future library update can't silently change behavior
- Add automated tests for the distance/ETA/progress calculations
- Add a small admin view for managing routes and stops

## Security Notes

This project loads a Firebase config with a real API key, and talks to a
public Firebase Realtime Database. That's normal for this kind of app, but
there are a few things worth understanding before you deploy or extend it —
see [**SECURITY.md**](SECURITY.md).

## Driver App
The bus driver will have a app for sending the location, instead of using gps module this will make costfree
## Author

**Abishek D** — built for Rajalakshmi Engineering College Transport.

---

*Live bus tracking dashboard for REC Transport, Thandalam, Chennai.*
