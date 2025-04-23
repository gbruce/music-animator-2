# Music Animator 2

A monorepo containing a Next.js web application and an Express API server.

## Project Structure

```
.
├── packages/
│   ├── web/          # Next.js web application
│   └── api/          # Express API server
├── package.json      # Root package.json for workspace management
└── README.md
```

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development servers:
   ```bash
   npm run dev
   ```

This will start both the web application and API server in development mode.

## Development

### Web Application

The web application is built with:
- Next.js
- React
- Radix UI
- Tailwind CSS

To run the web application separately:
```bash
cd packages/web
npm run dev
```

### API Server

The API server is built with:
- Express
- TypeScript
- CORS enabled

To run the API server separately:
```bash
cd packages/api
npm run dev
```

## Environment Variables

### API Server
Create a `.env` file in the `packages/api` directory:
```
PORT=3001
```

### Web Application
Create a `.env.local` file in the `packages/web` directory:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Building for Production

To build all packages:
```bash
npm run build
```

To start the production servers:
```bash
npm run start
``` 