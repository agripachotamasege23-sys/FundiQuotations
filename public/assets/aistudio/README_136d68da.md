# FundiQuotations Web Portal

Official bilingual (English & Kiswahili) web portal and Customer APK distribution hub for **FundiQuotations** — a mobile quotation, invoicing, materials management, and offline business app built for contractors, electricians, plumbers, and artisans.

## Features

- Official Customer APK download with version management
- SHA-256 checksum verification
- Bilingual interface (English / Kiswahili)
- Install guide and User guide
- Features showcase with real app screenshots
- FAQ, Privacy Policy, Terms of Service, and Account Deletion pages
- Admin panel for managing APK versions, screenshots, FAQs, and site settings
- Download statistics tracking
- Fully responsive design
- PWA support (Add to Home Screen)

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **Backend / Database:** Firebase (Firestore, Authentication, Storage)
- **Icons:** Lucide React
- **Animation:** Motion
- **Hosting:** Vercel (recommended) or Firebase Hosting

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
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_PRIMARY_ADMIN_EMAIL=your-admin@email.com
```

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
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
7. Deploy

### Alternative: Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Project Structure

```
├── public/                 # Static assets, robots.txt, sitemap, manifest
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context (Auth, Language, PortalData)
│   ├── data/               # Default content and translations
│   ├── lib/                # Firebase config and utilities
│   ├── pages/              # All route pages
│   ├── types/              # TypeScript types
│   └── App.tsx
├── firestore.rules         # Firestore security rules
├── storage.rules           # Storage security rules
└── vercel.json             # Vercel configuration
```

## License

Private — All rights reserved.  
© 2026 FundiQuotations
```
