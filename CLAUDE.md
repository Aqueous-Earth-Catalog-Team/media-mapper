# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Media Mapper is a Next.js application built with the App Router, TypeScript, and Tailwind CSS. The project is set up with shadcn/ui component system configuration (though components are not yet implemented).

## Development Commands

```bash
# Start the development server with Turbopack
npm run dev
# or
pnpm dev

# Build the application
npm run build
# or
pnpm build

# Start the production server
npm run start
# or
pnpm start

# Run linting
npm run lint
# or
pnpm lint
```

## Project Structure

- `app/` - Contains the Next.js App Router pages and layouts
- `lib/` - Utility functions, including `utils.ts` with Tailwind helper functions
- `public/` - Static assets (SVGs, images)

## Technology Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with the new custom variant syntax
- **UI Components**: Set up for shadcn/ui components (not yet implemented)
- **Icons**: Lucide React
- **Utilities**:
  - `clsx` and `tailwind-merge` for conditional classnames
  - `class-variance-authority` for component variants

## Design System Notes

The project uses Tailwind CSS with custom colors defined in `app/globals.css`. The theme includes:

1. Color scheme variables for light and dark modes
2. Custom typography using Geist Sans and Geist Mono fonts
3. Chart color variables for data visualization
4. Sidebar component styling variables

The styling adopts the new Tailwind CSS 4 features, including the `@theme inline` directive and custom variants with `@custom-variant`.

## Project Goals and Requirements

We developing an open sourced web application framework to explore media objects based on their geographical location data. The application is intended to provide a spatially driven way of exploring how topics (i.e. water, the environment, landmarks) are portrayed in media across space and time. The framework will be referenced as the Media Mapper (“MP”) throughout this work order.

The MP will be developed as an open source project so that anyone seeking to build a similar application with their own datasets can use or fork this framework to do so.

The following constitutes the requirements for the “MP”.

- The end product will be an open source and publicly available codebase that anyone can use to build and deploy their own Media Mapper web application.
- The end product will conform to accessibility requirements as defined in the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA
- The MP will be set up in such a way that it can be connected to any AirTable data source so long as the data source follows the data structure and permission conventions required by the MP.
- Users should be able to explore their media topic dataset through an interactive map and related UI components
  - Ability to browse the map by zooming in and out and panning across the map
  - Ability to select a data point and view additional information about the selected point such as images and related text information
  - Ability to share a unique URL related to each map data point
  - Ability to view entire data source in a tabular format
- The MP will provide sufficient documentation that will detail how to deploy, fork, and contribute to the project so that others may use the MP as a starting point for their own applications.
- The MP will be developed using a pilot dataset portraying how water is portrayed in media over space and time.
