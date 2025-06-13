# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a gamified quiz application for Computer Networks topics built with:
- Next.js 15.3.3 (App Router)
- TypeScript (strict mode)
- React 19
- Tailwind CSS v3.4.0
- Framer Motion v12.18.1 (for animations)

## Development Commands

```bash
npm run dev      # Start development server on port 3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Development Notes
- Never run `npm run dev` to test stuff, just `npm run build`.

## Architecture

### Core Data Flow
1. Questions are loaded from `/data/questions.ts` or `/lib/questions.json`
2. Game state is managed in the main Quiz component (`/components/Quiz.tsx`)
3. User progress persists via `useLocalStorage` hook
4. API routes in `/app/api/questions/` handle question data

### Key Type Definitions (`/types/quiz.ts`)
- `Question`: Quiz question with options, explanation, category, and difficulty
- `GameState`: Complete game state including score, lives, streak, timer
- `UserAnswer`: Tracks user responses and time spent
- `Score`: Scoring data with accuracy metrics

### Component Structure
- `Quiz.tsx`: Main container managing game flow
- `StartScreen.tsx` → `QuizScreen.tsx` → `ResultsScreen.tsx` → `ReviewScreen.tsx`
- Game features: lives system, timer, streaks, sound effects

### State Management
- Local React state for game logic
- `useLocalStorage` for persistence
- Timer handled via `NodeJS.Timeout`

### Game Mechanics
- **Lives**: Players start with 3 lives, lose one per wrong answer
- **Timer**: 60-second countdown per question
- **Streaks**: Track consecutive correct answers
- **Sound Effects**: Toggle on/off, files in `/public/sounds/`
- **Categories**: Questions grouped by topic (e.g., TCP/IP, Security, HTTP)
- **Difficulty**: Each question has a difficulty level affecting scoring

### Project Structure
```
/app              # Next.js App Router
  /api/questions  # Question data endpoints
/components       # React components
/data            # Question data (questions.ts)
/hooks           # Custom hooks (useLocalStorage, useSound)
/lib             # Utilities and alternative data (questions.json)
/types           # TypeScript definitions
/public          # Static assets (sounds, SVGs)
```

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` maps to project root
- No implicit any allowed

### Styling
- Tailwind CSS with custom configuration
- Global styles in `/app/globals.css`
- Responsive design patterns throughout

### No Testing Infrastructure
Currently no test framework is configured. Consider adding tests when implementing new features.

## Duolingo-Inspired Design Philosophy
- Implement a gamified learning experience similar to Duolingo
- Focus on:
  - Engaging, playful UI with immediate feedback
  - Streak-based motivation system
  - Bite-sized, progressive learning chunks
  - Reward mechanisms for consistent learning
  - Minimal, clean interface with vibrant colors
  - Gamification elements like XP, levels, and achievements
  - Sound and visual feedback for correct/incorrect answers
  - Progressive difficulty scaling
  - Social and competitive elements (optional leaderboards)
- Core principles:
  - Make learning computer networking feel like a game
  - Reduce cognitive load with intuitive design
  - Encourage daily practice and skill building
  - Create a sense of progress and accomplishment