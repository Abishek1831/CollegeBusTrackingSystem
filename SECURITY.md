# Security Notes

This is a student/portfolio project. It was reviewed before publishing to
GitHub. Here's what was found and what it means.

## Firebase API key in the source code

`assets/js/firebase-config.js` contains a real Firebase project config,
including an `apiKey`. This is **expected and normal** for a Firebase web
app — unlike a server-side secret key, a Firebase Web API key is not meant
to be hidden. It identifies which Firebase project your app talks to; it is
not, by itself, a password. Firebase's own documentation confirms this
directly: real access control is enforced through **Firebase Security Rules**
and (optionally) **Firebase Authentication**, not by keeping this key secret.

That said, two things are worth checking / doing before relying on this in
production:

1. **Check your Realtime Database Rules.** Make sure the `/buses` path is
   readable by anyone who should be able to view the dashboard (usually
   fine — it's public bus-location data), but that **writes are restricted**
   so only your trusted GPS-transmitting device/app can update positions.
   An open-write rule would let anyone push fake bus locations. Rules are
   configured in the Firebase Console → Realtime Database → Rules, not in
   this repository.
2. **Restrict the API key by domain**, in Google Cloud Console → APIs &
   Services → Credentials. This stops the key from being used to call
   Firebase APIs from a domain you don't control, even though the key
   itself isn't secret.

If you'd still rather not commit even a non-secret key to your repo history,
you can keep `assets/js/firebase-config.js` out of version control (there's
a commented-out pattern for this in `.gitignore`) and provide it locally, or
inject it at deploy time via your hosting provider.

## Other things worth knowing

- **No authentication on the dashboard itself.** Anyone with the URL can view
  all live bus locations. If that's not desired (e.g. you want it
  students/staff-only), you'll need to add an auth layer — this project
  doesn't include one.
- **`leaflet-routing-machine@latest`** is loaded from a CDN without a pinned
  version (`index.html`). This is convenient but means a future release of
  that library could change behavior without warning. Consider pinning it
  to a specific version once you've confirmed the app works well, so
  upgrades are a deliberate choice rather than automatic.
- **Client-side only.** All logic (distance, ETA, progress) runs in the
  browser using data from Firebase. There is no server-side validation of
  GPS data, so a bad or malicious write to `/buses/...` (see point 1 above)
  would be reflected directly on the dashboard.
- **`localStorage` usage.** Favorites, theme, and notification preference
  are stored in the browser's `localStorage`. This is per-device, not
  synced anywhere, and contains no sensitive information.

## Reporting

This is a student project without a formal security disclosure process. If
you fork this and find an issue, feel free to open a GitHub issue describing
it.
