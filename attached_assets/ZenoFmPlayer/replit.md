# AstroKalki - Karma-Based Astrology Platform

## Overview

AstroKalki is a mystical astrology platform that provides birth-data based readings, karma analysis, and personalized spiritual guidance. The application combines premium design aesthetics with actionable astrological insights, offering tools like Karma DNA analysis, karmic debt scanning, compatibility readings, and consultation booking. The platform uses a freemium model with Pro tier upgrades via UPI or PayPal.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite as build tool and dev server
- Wouter for client-side routing
- TanStack Query for server state management
- Tailwind CSS for styling with shadcn/ui component library

**Design System:**
- Typography: Playfair Display (serif, headings) + Inter (sans-serif, body)
- Color scheme: Dark cosmic theme with teal primary (`--primary: 168 100% 39%`)
- Component library: Radix UI primitives with custom shadcn/ui styling
- Spacing: Tailwind's 4px-based scale (4, 8, 12, 16, 24, 32)
- Custom utilities: Hover elevation effects, starfield backgrounds, gradient text

**Key Features:**
- Client-side karma calculation (deterministic algorithms in `/lib/karma.ts`)
- Real-time form validation with Zod schemas
- Responsive design with mobile-first approach
- Toast notifications for user feedback
- Tab-based navigation for multi-tool interfaces

**Page Structure:**
- Home: Hero section with UPI payment option and feature highlights
- Dashboard: Daily karma pulse with actionable guidance
- Karma: Multi-tab engine (DNA, Debts, Impacts, Radar, Bond)
- Plans: Freemium pricing comparison
- Consultations: Session booking (static content)
- Billing: Payment processing (UPI proof submission + PayPal integration)
- Radio: Embedded Zeno.FM live stream player
- Concierge: AI assistant preview (coming soon)

### Backend Architecture

**Technology Stack:**
- Express.js server (Node.js)
- TypeScript with ES modules
- Session-based architecture (no authentication implemented)
- RESTful API design

**API Endpoints:**
- `GET /api/user/plan` - Fetch user's current plan status
- `POST /api/payment/proof` - Submit UPI payment proof for Pro upgrade
- `GET /paypal/setup` - PayPal SDK configuration
- `POST /paypal/order` - Create PayPal order
- `POST /paypal/order/:orderID/capture` - Capture PayPal payment

**Storage Layer:**
- In-memory storage implementation (`MemStorage` class)
- Interface-based design (`IStorage`) allows future database migration
- Current state: User plan stored in memory (resets on server restart)
- Designed for single-user context (no multi-user support)

**Critical Constraints:**
- PayPal integration code MUST NOT be modified (marked with critical comments)
- Server middleware logs API requests with timing and response truncation

### Data Storage Solutions

**Current Implementation:**
- No database connected
- In-memory storage using TypeScript classes
- User plan state: `{ plan: "free" | "pro", upgradedAt?, paymentMethod?, transactionId? }`

**Planned Database Setup:**
- Drizzle ORM configured for PostgreSQL (`drizzle.config.ts`)
- Schema defined in `shared/schema.ts`
- Neon Database serverless driver included in dependencies
- Migration folder structure prepared (`/migrations`)
- Schema types: Karma forms, karma outputs, karmic debts, payment proofs, user plans

**Schema Design Principles:**
- Zod schemas for runtime validation
- Shared types between client and server (`@shared/schema`)
- Deterministic karma calculations (no DB queries needed for core features)

### External Dependencies

**Payment Processing:**
- PayPal Server SDK (`@paypal/paypal-server-sdk`)
  - Sandbox mode for development, Production mode for live deployment
  - Environment variables: `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`
  - Order creation and capture flow
  - Critical code sections must remain unmodified
- UPI payment proof submission (manual verification system)
  - UPI ID: `9211271977@hdfcbank`
  - UTR-based validation

**Third-Party Services:**
- Zeno.FM: Live radio streaming embed
  - URL: `https://zeno.fm/player/astrokalki-live`
  - Iframe-based integration

**Frontend Libraries:**
- Radix UI: Accessible component primitives (20+ components)
- TanStack Query: Server state synchronization with React
- Wouter: Lightweight routing (<2KB)
- date-fns: Date manipulation
- class-variance-authority: Component variant styling
- cmdk: Command palette components

**Development Tools:**
- Replit-specific plugins: Cartographer (dev mode), runtime error overlay
- TypeScript strict mode enabled
- Path aliases: `@/*` (client), `@shared/*` (shared schemas), `@assets/*` (static files)

**Database (Planned):**
- Neon Database (Serverless PostgreSQL)
- Drizzle ORM with PostgreSQL dialect
- Connection via `DATABASE_URL` environment variable
- Session store: `connect-pg-simple` for Express sessions

**Environment Configuration:**
- `NODE_ENV`: Controls production vs development mode
- `DATABASE_URL`: PostgreSQL connection (required but not yet provisioned)
- `PAYPAL_CLIENT_ID` & `PAYPAL_CLIENT_SECRET`: Payment gateway credentials
- `REPL_ID`: Replit-specific identifier for dev tooling