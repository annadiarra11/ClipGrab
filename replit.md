# Overview

TikDownloader is a full-stack web application that allows users to download TikTok videos by simply providing a URL. The application extracts video metadata and provides download options in different quality formats (HD, SD, and audio-only). Built with a React frontend and Express backend, it features a modern UI with internationalization support and uses the shadcn/ui component library for a polished user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with React and TypeScript, utilizing a component-based architecture with modern hooks and context patterns. The UI leverages shadcn/ui components built on top of Radix UI primitives for accessibility and consistency. Key architectural decisions include:

- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with a custom design system including TikTok-branded colors
- **Component Library**: shadcn/ui with extensive Radix UI integration for accessibility
- **Build Tool**: Vite for fast development and optimized production builds
- **Language Support**: Custom internationalization system with React Context for multi-language support

The frontend follows a feature-based folder structure with reusable UI components, custom hooks, and centralized configuration.

## Backend Architecture
The server-side uses Express.js with TypeScript in ESM format, providing a RESTful API for video processing. Key components include:

- **API Design**: RESTful endpoints for video extraction and download operations
- **Video Processing**: Integration with @tobyg74/tiktok-api-dl library for TikTok content extraction
- **Caching Strategy**: In-memory caching system with TTL for video metadata to reduce API calls
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development Setup**: Vite integration for SSR and hot module replacement in development

The backend implements a clean separation of concerns with dedicated modules for routes, storage, and server configuration.

## Data Storage Solutions
The application uses a hybrid storage approach:

- **Primary Database**: PostgreSQL with Neon as the serverless database provider
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Management**: Shared schema definitions using Zod for validation across frontend and backend
- **Caching Layer**: In-memory storage implementation for temporary video metadata caching

The database schema is defined in a shared module to ensure consistency between client and server validation.

## API Structure
The application exposes a minimal REST API:

- **POST /api/extract**: Extracts video metadata from TikTok URLs with caching support
- **GET /api/download**: Initiates video downloads with quality selection

API responses follow consistent JSON structures with proper error handling and validation using Zod schemas.

# External Dependencies

## Third-Party Services
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **TikTok API**: @tobyg74/tiktok-api-dl library for extracting video content and metadata from TikTok URLs

## Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment support
- **TypeScript**: Full type safety across the entire stack
- **ESBuild**: Production bundling for the Node.js backend

## UI Libraries
- **Radix UI**: Comprehensive component primitives for accessible UI components
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for component variant management
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens

## Validation and Forms
- **Zod**: Schema validation library shared between frontend and backend
- **React Hook Form**: Form state management with @hookform/resolvers for Zod integration

The application is designed to be easily deployable on Replit with minimal configuration while maintaining production-ready architecture patterns.