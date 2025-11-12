# AstroKalki - Karma Analysis Platform

## Overview
AstroKalki is a comprehensive Vedic astrology and karma analysis platform that provides personalized insights using AI-powered analysis. The platform offers Karma DNA analysis, karmic debts scanning, and compatibility analysis.

## Recent Changes (2025-01-12)

### Migration to Replit Environment
- Migrated project from Replit Agent to Replit environment
- Updated to use `GOOGLE_API_KEY` for Gemini AI integration
- Added retry logic with exponential backoff for API calls
- Improved error handling with user-friendly error messages
- Added `/api/test-ai` endpoint for service verification

### AI Service Improvements
- Implemented retry mechanism for transient errors (429, 503, timeouts)
- Added better error message formatting
- Centralized API key management to support both `GOOGLE_API_KEY` and `GEMINI_API_KEY`

## Project Architecture

### Technology Stack
- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Backend**: Express.js, Node.js
- **AI**: Google Gemini AI (gemini-2.0-flash-exp)
- **Database**: PostgreSQL (planned, not yet provisioned)
- **UI Components**: Radix UI, shadcn/ui

### Directory Structure
```
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
├── server/          # Backend Express server
│   ├── index.ts     # Main server entry point
│   ├── routes.ts    # API route definitions
│   ├── gemini.ts    # AI service integration
│   └── storage.ts   # Data storage layer
├── shared/          # Shared types and schemas
└── attached_assets/ # Static assets
```

## Environment Variables

### Required
- `GOOGLE_API_KEY`: Google Gemini AI API key (required for AI analysis features)
  - Alternative: `GEMINI_API_KEY` (fallback)
  - Get your key from: https://ai.google.dev/

### Optional
- `NODE_ENV`: Controls production vs development mode (default: development)
- `PORT`: Server port (default: 5000)
- `DATABASE_URL`: PostgreSQL connection string (planned feature)

## Features

### AI-Powered Analysis
1. **Karma DNA Analysis** - Comprehensive life pattern analysis
   - Core life lessons and spiritual insights
   - Shadow triggers and boundary rules
   - Integrity, reciprocity, and value scores
   - Actionable steps for personal growth

2. **Karmic Debts Scanning** - Numerology-based debt identification
   - Identification of recurring life patterns
   - Severity assessment
   - Healing actions and guidance

3. **Compatibility Analysis** - Relationship synastry analysis
   - Mind, heart, and will compatibility scores
   - Strengths and challenges identification
   - Growth opportunities and recommendations

### API Endpoints
- `GET /api/health` - Health check and feature availability
- `POST /api/test-ai` - Test AI service connection
- `POST /api/analysis/karma-dna` - Karma DNA analysis
- `POST /api/analysis/karmic-debts` - Karmic debts scanning
- `POST /api/analysis/compatibility` - Compatibility analysis
- `GET /api/user/plan` - User plan status
- `POST /api/payment/proof` - UPI payment proof submission

## Setup Instructions

### 1. Install Dependencies
Dependencies are automatically installed via the packager tool.

### 2. Configure API Keys
Set the `GOOGLE_API_KEY` environment variable with your Gemini API key:
- Get a key from https://ai.google.dev/
- Note: Free tier has rate limits (monitor usage)

### 3. Run the Application
The workflow "Start application" runs automatically:
```bash
npm run dev
```

Server will be available at: http://localhost:5000

## Development Guidelines

### Error Handling
- All AI calls use retry logic with exponential backoff
- User-friendly error messages for common failures
- Proper HTTP status codes (429 for rate limits, 503 for service unavailable)

### Security
- API keys are environment variables (never committed)
- No secrets exposed in error messages
- Input validation using Zod schemas

### Testing
Use the test endpoint to verify AI service:
```bash
curl -X POST http://localhost:5000/api/test-ai
```

## Known Limitations
- Gemini API free tier has strict rate limits
- Database features are planned but not yet implemented
- Payment integration is in development

## User Preferences
- Use modern, clean TypeScript code
- Follow existing patterns and conventions
- Prioritize security and error handling
- Keep error messages user-friendly
