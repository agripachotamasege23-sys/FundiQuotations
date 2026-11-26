# FundiQuotations Web Portal

Official bilingual (English & Kiswahili) web portal and Customer APK distribution hub for **FundiQuotations** — a mobile quotation, invoicing, materials management, and offline business app built for contractors, electricians, plumbers, and artisans.

## Features

- Official Customer APK download with version management (free HTTPS links or Firebase Storage)
- Automated SHA-256 checksum verification and release announcements
- Bilingual interface (English / Kiswahili) across all public pages
- Step-by-step Android Installation Guide and searchable User Guide
- Features showcase with sanitized real Android app screenshots
- FAQ, Support contact form, About Us, Privacy Policy, Terms & Conditions, and Account Deletion pages
- Protected Admin Console for managing APK versions, screenshots, guides, tutorials, FAQs, and site settings
- Verified Customer APK download statistics tracking
- Fully responsive design
- PWA support (Add to Home Screen)

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **Backend / Database:** Firebase (Firestore, Authentication, Storage)
- **Icons:** Lucide React
- **Animation:** Motion
- **Hosting:** Vercel (recommended) or Node.js / Firebase Hosting

## Getting Started

### Prerequisites

- Node.js 20+
- npm or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd fundiquotations-web

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_ID=(default)
VITE_PRIMARY_ADMIN_EMAIL=your-admin@email.com
```

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build & Type-Check for Production

```bash
npm run lint
npm run build
```

The production files will be generated in the `dist` folder.

## Deployment

### Recommended: Vercel

1. Push your code to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add the environment variables listed above
7. Add your live domain under **Firebase Console → Authentication → Settings → Authorized domains**
8. Deploy

### Alternative: Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Project Structure

```text
├── public/                 # Static assets, robots.txt, sitemap.xml, manifest, sw.js
├── src/
│   ├── components/         # Reusable UI components & admin sections
│   ├── context/            # React Context (Auth, Language, PortalData)
│   ├── data/               # Default content, legal text, and translations
│   ├── hooks/              # Custom React hooks (PWA install, etc.)
│   ├── lib/                # Firebase config and APK utilities
│   ├── pages/              # All route pages
│   ├── types/              # TypeScript types
│   └── App.tsx
├── firestore.rules         # Firestore security rules
├── storage.rules           # Storage security rules
├── server.ts               # Express + Vite server entry point
└── vercel.json             # Vercel configuration
```

## License

Private — All rights reserved.  
© 2026 FundiQuotations · Agritech Electrical Solutions
