# Fluence — static prototype

Fluence is a small static website scaffold intended for preteen/teen learners who are non-native English speakers. It's a friendly, bubbly UI using a gentle color palette.

Files:
- `index.html` — homepage
- `calendar.html` — interactive calendar (events stored in localStorage)
- `lessons.html` — lesson cards, add local lessons client-side
- `about.html` — about and team section
- `css/styles.css` — styles (color palette and layout)
- `js/main.js` — small UI helpers
- `js/calendar.js` — calendar logic

To try locally:

1. Open `index.html` in your browser (no server required). Example using xdg-open:

   xdg-open index.html

2. Or serve with a tiny static server (recommended for consistent behavior):

   python3 -m http.server 8000
   then open http://localhost:8000 in your browser

Notes:
- Calendar events are stored in your browser's localStorage — they are local to the device and not synced.
- Replace placeholder images by adding files in an `assets/` folder and updating the HTML where noted.

If you'd like, I can:
- Add sample images in `assets/`
- Hook up a simple JSON backend for syncing events and lessons
- Add teacher profiles & booking UI
# Website-Design-FBLA-ema-ad-