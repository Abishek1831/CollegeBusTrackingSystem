// Firebase configuration for the REC Live Bus Tracking dashboard.
//
// This must load BEFORE script.js (see index.html).
//
// Note on the apiKey below: Firebase Web API keys are not secret in the way
// a server API key is — they identify your Firebase project to Google, and
// real access control is enforced by your Firebase Realtime Database
// Security Rules, not by hiding this key. It is normal and expected for
// this key to be visible in a deployed web app's source.
//
// What DOES matter for security here: make sure your Realtime Database
// Rules only allow the values this dashboard needs to read (the `buses`
// path) to be read publicly, and that writes are restricted to your GPS
// transmitting device/app (e.g. via Firebase Auth), not open to anyone.
// See SECURITY.md for details.
//
// To point this dashboard at your own Firebase project instead of the
// existing one, replace the values below with your project's config
// (Firebase Console → Project Settings → General → Your apps → SDK setup).
const firebaseConfig = {
    apiKey: "AIzaSyBZ_h5BTak_YJ4AbhFLmSbStMvLh-f0Kl8",
    authDomain: "rec-bus-tracking.firebaseapp.com",
    databaseURL: "https://rec-bus-tracking-default-rtdb.firebaseio.com",
    projectId: "rec-bus-tracking",
    storageBucket: "rec-bus-tracking.firebasestorage.app",
    messagingSenderId: "253152097589",
    appId: "1:253152097589:web:7c8987b567a4d2303f487c"
};
