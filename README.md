# Taghyeer Chat — Frontend

A real-time 1-to-1 and group chat application built with Next.js.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: TanStack Query (server state) + React hooks (local state)
- **Forms**: React Hook Form + Zod
- **Real-time**: Socket.io Client
- **UI Primitives**: shadcn/ui compatible (Radix UI + Lucide React)
- **Testing**: Jest + React Testing Library

## Prerequisites

- Node.js ≥ 18
- npm ≥ 9

## Setup

1. **Clone the repository** and install dependencies:

   ```bash
   npm install
   ```

2. **Configure environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Then open `.env.local` and fill in the required values:

   | Variable                  | Description                      |
   | ------------------------- | -------------------------------- |
   | `NEXT_PUBLIC_API_BASE_URL` | Base URL of the REST API server  |

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start the development server    |
| `npm run build`   | Build for production            |
| `npm run start`   | Start the production server     |
| `npm run lint`    | Run ESLint                      |
| `npm test`        | Run tests (watch mode)          |
| `npm run test:ci` | Run tests once (CI mode)        |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
├── components/
│   ├── ui/                 # Reusable, unstyled/primitive UI components (shadcn/ui)
│   └── shared/             # Reusable composed components used across features
├── features/
│   └── chat/               # Chat feature module
│       ├── components/     # Chat-specific UI components
│       ├── hooks/          # Chat-specific React hooks
│       ├── services/       # Chat API/socket service functions
│       ├── types/          # Chat-specific TypeScript types
│       └── utils/          # Chat-specific utility functions
├── lib/                    # Third-party library configuration (QueryClient, etc.)
├── services/               # Shared API service utilities (http client config)
├── types/                  # Shared global TypeScript types
└── utils/                  # Shared utility functions
```

## API Documentation

See [docs/API.md](./docs/API.md) for API endpoint documentation.
