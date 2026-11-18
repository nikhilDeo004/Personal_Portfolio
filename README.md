# Nikhil Deo — Portfolio (React + Vite)

A monochrome portfolio with:
- a full-screen `< FULL-STACK DEVELOPER />` opener and a "Hi, I'm Nikhil." intro
- folder-style project cards (hover to peek, click for details)
- a horizontal experience timeline (vertical on phones)
- a "Let's talk." contact form that opens a pre-filled email
- a footer with site search and an animated ink city crowd, with Nikhil and his Vespa in the middle
- an on-site chat assistant that answers from the resume (no backend or API key)
- light/dark theme toggle

React only. No backend is needed.

## Run it

```bash
npm install
npm run dev      # open http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the build
```

Requires Node.js 18+.

## Edit content

Everything personal is in **`src/data/profile.js`**: titles, intro, projects, experience,
skills, certifications, socials, and the chat assistant's answers (`assistantKB`).

- Photo: `public/portrait.jpg` (black & white). To add a colour version that fades in on hover, add `public/portrait-color.jpg` and set `portraitColor` in `profile.js`
- Resume: `public/Nikhil_Deo_Resume.pdf`
- Add GitHub: set `githubUrl` and add it to `socials` in `profile.js`
- Colours and fonts: CSS variables at the top of `src/index.css`
- Footer illustration: `src/components/FooterScene.jsx` and `Characters.jsx`

## Deploy

Push to GitHub and import into Vercel or Netlify. Build command `npm run build`, output folder `dist`.
