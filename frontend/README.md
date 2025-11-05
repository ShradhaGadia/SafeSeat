# 🛡️ SafeSeat
_India’s railway booking platform with women’s safety first_

SafeSeat intelligently allocates train seats to provide secure, comfortable, and optimized travel experiences for women passengers. This repository contains the frontend (TypeScript + Vite) for the SafeSeat project.

---
## About
SafeSeat is designed to improve safety and comfort for women travelling by train by prioritizing seat allocation and offering a streamlined booking flow. The frontend in this repo focuses on UI, user flows, and communicating with the backend seat-allocation services.

## Features
- Seat allocation optimized for women’s safety
- Responsive UI built with TypeScript
- Pages and components split for easy extension
- Simple onboarding and booking flows

## Project Structure
SafeSeat-Frontend/
│
├── public/             # static assets (images, index.html)
│   ├── train.png
│   └── index.html
│
├── src/                # application source
│   ├── components/     # reusable components
│   ├── pages/          # route pages
│   ├── App.tsx
│   └── main.tsx
│
└── package.json

---

## Setup & Development
Prerequisites: Node.js (>= 14) and npm or yarn.

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

Thank you for working on SafeSeat — a product that focuses on safer travel for women.
