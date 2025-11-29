# FontPlay - Typography Showcase Application

## Overview

FontPlay is a web application that allows users to type any text and instantly see it rendered in a curated collection of beautiful fonts. The application showcases 24 different typefaces across serif, sans-serif, monospace, and display categories, helping users find the perfect font for their design projects.

The application follows a minimalist design philosophy inspired by Google Fonts, where the typography itself is the star of the interface. Users can enter text, view it in a randomly selected featured font, and browse the entire font gallery with their custom text displayed in each typeface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript  
The frontend is built using React 18+ with TypeScript for type safety. The application uses a modern React approach with functional components and hooks.

**Routing**: Wouter  
Lightweight client-side routing library chosen over React Router for its minimal footprint. The application currently has a simple routing structure with a home page and 404 page.

**State Management**: TanStack Query (React Query)  
Server state management is handled through React Query, providing caching, background updates, and optimistic UI patterns. Local UI state is managed through React hooks (useState, useCallback).

**Styling**: Tailwind CSS with shadcn/ui components  
The project uses Tailwind CSS for utility-first styling with a custom design system based on the "new-york" style from shadcn/ui. Custom CSS variables are used for theming, supporting both light and dark modes.

**UI Components**: shadcn/ui with Radix UI primitives  
A comprehensive component library built on Radix UI primitives, providing accessible and composable UI components. Components include buttons, cards, inputs, badges, and various Radix-based interactive elements.

**Build Tool**: Vite  
Fast development server and optimized production builds. Configured with React plugin and Replit-specific plugins for development tooling.

### Backend Architecture

**Framework**: Express.js  
Minimal REST API built with Express.js, serving two main endpoints:
- `GET /api/fonts` - Returns all available fonts
- `GET /api/fonts/random` - Returns a random font from the collection

**Server Organization**:
- `server/index.ts` - Main Express application setup with middleware and logging
- `server/routes.ts` - API route definitions
- `server/storage.ts` - Data layer abstraction (currently in-memory storage)
- `server/static.ts` - Static file serving for production builds
- `server/vite.ts` - Vite middleware integration for development

**Development vs Production**: The application uses Vite's development server in dev mode and serves pre-built static assets in production.

### Data Storage Solutions

**Current Implementation**: In-Memory Storage  
The application currently uses a simple in-memory storage implementation (`MemStorage`) that serves font data from a static array defined in the shared schema. This is suitable for the current read-only use case.

**Database Configuration**: PostgreSQL with Drizzle ORM  
While not currently utilized, the application is configured to support PostgreSQL through:
- Drizzle ORM for type-safe database operations
- Neon serverless Postgres adapter
- Database connection configuration in `drizzle.config.ts`

This infrastructure suggests the application is prepared for future features that may require persistent storage (user accounts, saved font collections, etc.).

### Design System

**Typography Hierarchy**:
- UI Font: Inter or system UI stack
- Display Fonts: 24 curated fonts across 4 categories (serif, sans-serif, monospace, display)
- Font sizes: Responsive sizing with mobile/desktop variants

**Layout System**:
- Tailwind spacing scale (4, 6, 8, 12, 16, 24 units)
- Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Max-width container: 6xl with horizontal padding

**Theme System**:
- CSS custom properties for color tokens
- Light/dark mode support through ThemeProvider
- Neutral base color palette
- Automatic theme detection with manual toggle capability

### External Dependencies

**Google Fonts**: The application loads all 24 fonts from Google Fonts CDN via link tags in the HTML. Fonts are loaded upfront to ensure immediate availability when users type.

**UI Libraries**:
- Radix UI: Headless component primitives for accessible UI
- Lucide React: Icon library
- class-variance-authority: Variant-based component styling
- tailwind-merge: Intelligent Tailwind class merging

**Development Tools**:
- Replit-specific plugins for development experience (cartographer, dev banner, runtime error overlay)
- TypeScript for type checking
- ESBuild for server bundling

**Build Process**:
- Custom build script using ESBuild for server bundling with selective dependency bundling
- Vite for client-side bundling
- Separation of bundled vs external dependencies to optimize cold start times