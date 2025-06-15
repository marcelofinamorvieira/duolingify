# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a generic Duolingo-style gamified quiz application built with:
- Next.js 15.3.3 (App Router)
- TypeScript (strict mode)
- React 19
- Tailwind CSS v3.4.0
- Framer Motion v12.18.1 (for animations)
- Howler.js v2.2.4 (for sound effects)

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
1. Questions are imported via JSON through the JSONInput component
2. Game state is managed in the main Quiz component (`/components/Quiz.tsx`)
3. User progress persists via `useLocalStorage` hook
4. API routes in `/app/api/questions/` are planned but not yet implemented

### Key Type Definitions (`/types/quiz.ts`)
- `Question`: Quiz question with options, explanation, category, and difficulty
- `GameState`: Complete game state including score, lives, streak, timer
- `UserAnswer`: Tracks user responses and time spent
- `Score`: Scoring data with accuracy metrics

### Component Structure
- `Quiz.tsx`: Main container managing game flow
- `StartScreen.tsx` → `QuizScreen.tsx` → `ResultsScreen.tsx` → `ReviewScreen.tsx`
- Additional components: `Header.tsx`, `XPBar.tsx`, `Confetti.tsx`, `BookmarkedQuestions.tsx`
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
- **Categories**: Questions grouped by topic (customizable per subject)
- **Difficulty**: Each question has a difficulty level affecting scoring
- **XP System**: Experience points for correct answers and streaks
- **Bookmarks**: Save questions for later review
- **Haptic Feedback**: Mobile vibration support

### Project Structure
```
/app              # Next.js App Router
  /api/questions  # Question data endpoints
/components       # React components
/data            # Question data (questions.ts)
/hooks           # Custom hooks (useLocalStorage, useSound, useXPSystem, useBookmarks, useHapticFeedback, useAnimationTimer)
/lib             # Utilities (animationConfig.ts) and alternative data (questions.json)
/types           # TypeScript definitions
/public          # Static assets (sounds, SVGs)
```

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` maps to project root
- No implicit any allowed

### Styling
- Tailwind CSS v3.4.0 with standard configuration
- Global styles in `/app/globals.css`
- Responsive design patterns throughout
- Framer Motion for animations (configured in `/lib/animationConfig.ts`)

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

## Question Data Format
Questions follow a specific JSON structure (see `/json.md` for detailed documentation):
- Required fields: id, question, options (A-D), correctAnswer, explanation, category, difficulty
- Categories are fully customizable based on your subject matter
- Difficulty levels: "easy", "medium", "hard"
- Questions can be imported via the JSONInput component