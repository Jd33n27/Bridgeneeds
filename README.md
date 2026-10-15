# Bridgeneeds — Premium Music Talent Marketplace

Bridgeneeds is a premium, responsive web application connecting music professionals (producers, sound engineers, vocalists, songwriters, session musicians) with creators, record labels, and commercial organizations.

---

## 🎵 Product Features

- **Home Page (`/`)**: Hero search, category discovery, selected talent roster, featured fixed-price services, workflow visualization, dual audience portals (For Talent & For Business), and trust indicators.
- **Discover Talent (`/discover`)**: Search and filter music talent by role, genre, instrument, location, remote availability, budget, and verification badge.
- **Talent Profile (`/talent/:id`)**: Rich portfolio page showcasing verified discography, studio equipment, packaged services, audio sample player, ratings, client reviews, and custom brief request modal.
- **Services Catalog & Detail (`/services`, `/services/:id`)**: Fixed-price service packages (Basic, Standard, Premium), stem deliverables checklist, client requirements, delivery turnaround, and revision policies.
- **How It Works (`/how-it-works`)**: Step-by-step guide explaining brief posting, proposal matching, milestone escrow protection, and sign-off.
- **For Talent (`/for-talent`)**: Value proposition for music creators with storefront tools, payout protection, and verified discography credits.
- **For Business (`/for-business`)**: Solutions for record labels, sync agencies, and commercial brands (enterprise invoicing, NDAs, team seats).
- **Authentication (`/signin`, `/signup`)**: Role selection (Client vs Talent), form validation, terms agreement, and simulated session state.
- **Create Brief (`/create-brief`)**: 6-step guided form for project type, creative references, deliverables, budget range, deadline, and review step. Saves briefs locally for demo.
- **Client Dashboard (`/dashboard/client`)**: View active projects, review incoming proposals, accept bids with escrow funding, and manage published briefs.
- **Talent Dashboard (`/dashboard/talent`)**: View active client orders, submit proposals to open client briefs, manage live services storefront, and track earnings.
- **Project Workspace (`/projects/:id`)**: Milestone progress timeline, 24-bit WAV deliverables vault with audio player, live simulated message thread, file uploader, and milestone payout release simulator.

---

## 🎨 Color System & Design System Tokens

Bridgeneeds uses a custom CSS token design system configured on `:root` and `[data-theme="dark"]`:

- **Evergreen 950**: `#10231A`
- **Evergreen 900**: `#173D2A`
- **Evergreen 800**: `#205238`
- **Brand Green 700**: `#287A4B`
- **Brand Green 600**: `#31945B`
- **Fresh Lime 400**: `#C8F169`
- **Fresh Lime 200**: `#E8F8B5`
- **Warm White**: `#FAF9F5`
- **White**: `#FFFFFF`
- **Neutral 100**: `#F0F1EC`
- **Neutral 200**: `#E0E3DC`
- **Neutral 500**: `#747B74`
- **Neutral 700**: `#3C453E`
- **Neutral 950**: `#172019`
- **Success**: `#197447` | **Warning**: `#9A5A0A` | **Error**: `#B42318` | **Information**: `#245DB5`

**Spacing Scale**: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18 / 19, TypeScript, HTML5, CSS3 Tokens
- **Routing**: React Router (`react-router-dom` v6/v7)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Testing**: Vitest & React Testing Library

---

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev

# Run Vitest component tests
npm run test

# Production build
npm run build
```

---

## ⚙️ Backend Integration & Mock Data Status

| Feature | Working State | Data Source | Requires Backend For |
|---|---|---|---|
| Talent Search & Filtering | Working | Local `mockTalent.ts` via `searchTalent()` service | Live database queries (PostgreSQL/Supabase) |
| Brief Creation | Working | Persisted to `localStorage` | DB persistence & email notifications |
| Audio Player Showcase | Working | Synthetic Audio API & MP3 streams | Cloud Storage (AWS S3 / GCS) file streaming |
| Proposal Acceptance | Working | Local state update | Stripe / Paystack Escrow payment processing |
| Project Workspace | Working | Simulated workspace state | Real-time WebSockets / Firebase Messaging |
| Theme & Role Toggling | Working | Local React Context | User profile persistence |

---

## 📂 Project Architecture

```
src/
├── app/             # App entry points & legacy routes
├── components/      # Reusable UI components (AppShell, TalentCard, ServiceCard, PortfolioPlayer, etc.)
│   ├── layout/      # Header, Footer
│   └── ui/          # Button, TextField, FilterPanel, BriefForm, Toast, Modal, etc.
├── context/         # AppContext (Theme, Toast, Role, Favorites, Global Audio)
├── data/            # Dedicated mock data files (mockTalent, mockServices, mockBriefs, mockProjects)
├── hooks/           # Custom React hooks
├── lib/             # Service functions & storage helpers (searchTalent, getTalentProfile, etc.)
├── pages/           # React Router Page views
├── styles/          # Design Tokens & Global CSS (tokens.css, globals.css)
├── tests/           # Vitest unit tests
└── types/           # TypeScript interface models (User, TalentProfile, Service, Brief, etc.)
```

---

## 📜 License

© Bridgeneeds Technologies. All rights reserved.
