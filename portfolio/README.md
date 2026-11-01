# Harshini — Portfolio (React + Vite)

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build for production
```bash
npm run build      # outputs to dist/
npm run preview
```

## Edit your content
Everything (text, projects, skills, experience) lives in `src/data.js`.
To add project links, set `links: [{ label: "Live demo", href: "https://..." }]` on a project.
Still to fill in: LeetCode username/link, confirmed CodeChef rating.

## Deploy
- **Vercel / Netlify:** import the repo; build command `npm run build`, output directory `dist`.
- **GitHub Pages:** upload the contents of `dist/` (the build uses relative paths, so no extra config).

Requires Node.js 18+.
