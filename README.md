# Div Tag Studios Website

A modern, performant, and SEO-optimized service website built with Next.js 14+ App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (configured and ready to use)
- **Package Manager**: npm

## Project Structure

```
.
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with Tailwind directives
├── components/            # React components
├── lib/                   # Utility functions and helpers
│   └── utils.ts          # cn() utility for className merging
├── public/               # Static assets
├── .kiro/                # Kiro spec files
└── components.json       # shadcn/ui configuration
```

## Getting Started

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

Run the production build:

```bash
npm start
```

## Configuration

### Path Aliases

The project is configured with `@/*` path alias pointing to the root directory:

```typescript
import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"
```

### shadcn/ui

shadcn/ui is configured and ready to use. Add components using:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

## Features

This website will showcase:

- 6 core services (Web Development, Android Development, UI/UX Design, Graphic Design, Video Editing, SEO)
- Responsive design (mobile, tablet, desktop)
- SEO optimization with metadata and structured data
- Accessibility compliance (WCAG 2.1 AA)
- Contact form with validation
- Smooth scroll navigation
- Modern UI with animations

## Requirements

- Node.js 18+ 
- npm

## License

Private - Div Tag Studios
