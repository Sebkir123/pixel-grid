Pixel Grid 🎨

A lightweight React sandbox where every click paints a pixel. Perfect for demoing optimistic UI updates, CSS Grid, and a micro client-server loop.

🚀 Run locally

# clone

git clone https://github.com/<your‑user>/pixel-grid.git
cd pixel-grid

# install deps & start dev server

npm install
npm start # ⇒ http://localhost:3000

Optional: point to a backend with two tiny JSON routes by setting an env var:
REACT_APP_BACKEND_URL=http://localhost:5000 npm start

🖥️ How it works

Action

What happens

Click pixel

UI recolors instantly (optimistic state) → POST /setGridColor updates server

Page load

GET /grid → paints saved state; fallback = blank canvas

No server

Frontend seeds white pixels so you can still draw locally

🛠️ Stack

React 18 – functional components + hooks

CSS Grid – crisp 20 × 20 layout, zero libs

fetch API – minimal networking, no axios
