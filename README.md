# Sakalla Font Editor

A web app that lets you type any text and instantly preview it in 41 beautiful fonts. Perfect for finding the right typeface for your projects.

**Live Demo:** https://compulsory-bobcat-replitwebprojectandstuffnoiamnotrepl-de27cce8.koyeb.app/ (For Now Ig)

## Features

- **41 Curated Fonts** - Serif, sans-serif, monospace, display, and 3D fonts
- **Live Preview** - See your text instantly in each font
- **Random Font Picker** - Discover fonts randomly
- **Copy Font Names** - Click to copy any font name
- **Dark/Light Mode** - Toggle between themes
- **Fully Responsive** - Works on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Backend**: Express.js
- **Styling**: Tailwind CSS + shadcn/ui
- **Fonts**: Google Fonts
- **Build Tool**: Vite
- **Deployment**: Koyeb (free tier)

## Getting Started

### Local Development


```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5000`

### Build for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## File Structure


```
âš¤
    â¨› client/                # React frontend
    â¨› ûŠ src/
    â©ã€ËŽ
ã€ã‚‚ã‚³ãƒ—ãƒ§ãƒ³/
    â©ã€ËŽ
ã€ã‚‚ã‚½ãƒ³ã‚µãƒ³ã‚¦ãƒ³ã—ãƒ—ãƒ§ãƒ³/
    â©ã€ËŽ
ã€ã‚‚ãƒ™ãƒ£ãƒ³ã»ãƒ—ãƒ§ãƒ³.tsx
    â©ã€Ê¾K> index.html
â©â¨â˜server/              # Express backend
â©â¨â˜¾â€¾Â¬ index.ts          # Server setup
â©â¨€â˜»â€¾Â¬ routes.ts       # API routes
â©â¨€â˜»â€¾Â¬ storage.ts      # Data layer
â©â¨€â˜»â€¾Â¬ shared/               # Shared types
â©â¨â˜¾â€¾Â¬ schema.ts         # Font data
â©â¨€â˜»â€¾Â¬ package.json
```

## API Routes

- `GET /api/fonts` - Get all available fonts
- `GET /api/fonts/random` - Get a random font

## Fonts Included


### Serif
Playfair Display, Merriweather, Lora, Libre Baskerville, Source Serif 4

### Sans-Serif
Poppins, Montserrat, Open Sans, Roboto, Inter, DM Sans, Plus Jakarta Seruf, Space Grotesk, Outfit, GebÉÝ

### Monospace
Space Mono, JetBrains Mono, Fira Code, Roboto Mono, Source Code Pro, IBM Plex Mono, Geist Mono

### Display
Architects Daughter, Oxanium, Permanent Marker, Black Ops One, Fredericka the Great, Creepster, Press Start 2P, Tourney, Dancing Script, AfG "Tdne One

### 3D & Special Effects
Bungee, Bungee Shade, Bungee Inline, Bungee Outline, Nabla, Kablammo, Rubik Moonrocks, Rubik Wet Paint, Stalinist One

## Deployment

This project is deployed on **Koyeb** (free tier):

1. Push code to GitHub
2. Connect GitHub repo to Koyeb
3. Select branch: `main`
4. Koyeb auto-builds and deploys
5. Get a live URL instantly

No credit card required for free tier deployment.

## License

MIT

## Author

Created with â‚  for font lovers everywhere  ð›Œµ
