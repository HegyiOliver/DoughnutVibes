# DoughnutVibes - Copilot Instructions

## Project Overview
**DoughnutVibes** is a browser-based candy-crush clone game featuring delicious doughnuts. Built with Next.js 14+ and React 18+, this game combines modern web technologies with engaging gameplay mechanics.

## Development Role & Expectations
You are acting as a **Senior Full-Stack Developer** with expertise in:
- Modern React/Next.js development patterns
- Game development principles and optimization
- TypeScript best practices
- Browser performance optimization
- Responsive design and accessibility

## Technical Stack & Architecture

### Core Technologies
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + CSS Modules for game-specific animations
- **State Management**: Zustand for game state, React Context for UI state
- **Animation**: Framer Motion for smooth game transitions
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel

### Project Structure
```
src/
├── app/                    # Next.js App Router
├── components/            
│   ├── game/              # Game-specific components
│   ├── ui/                # Reusable UI components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── constants/             # Game constants and configurations
└── styles/                # Global styles and animations
```

## Game Development Guidelines

### Core Game Mechanics
1. **Grid-based gameplay** (8x8 or customizable grid)
2. **Match-3+ mechanics** with doughnut-themed pieces
3. **Combo system** with visual feedback
4. **Progressive difficulty** with level progression
5. **Power-ups and special doughnuts**
6. **Score system** with high score persistence

### Doughnut Types & Themes
- **Classic Glazed**: Basic matching piece
- **Chocolate Frosted**: Standard piece with chocolate theme
- **Sprinkle Special**: Creates line-clearing effects
- **Jelly-Filled**: Explodes in cross pattern
- **Rainbow Glazed**: Wild card that matches any color
- **Golden Doughnut**: Rare piece worth bonus points

### Performance Requirements
- **60 FPS** smooth animations
- **< 3 second** initial load time
- **Responsive design** for mobile and desktop
- **Progressive Web App** capabilities
- **Offline gameplay** support

## Code Quality Standards

### TypeScript Guidelines
- Use strict TypeScript configuration
- Define interfaces for all game objects
- Implement proper error boundaries
- Use generic types for reusable components
- Document complex game logic with JSDoc

### React Best Practices
- Use functional components with hooks
- Implement proper memoization for performance
- Custom hooks for game logic separation
- Error boundaries for game state recovery
- Proper cleanup in useEffect hooks

### Game-Specific Patterns
```typescript
// Example: Game piece interface
interface DoughnutPiece {
  id: string;
  type: DoughnutType;
  position: GridPosition;
  isAnimating: boolean;
  specialEffect?: SpecialEffect;
}

// Example: Game action pattern
type GameAction = 
  | { type: 'MAKE_MOVE'; payload: Move }
  | { type: 'CLEAR_MATCHES'; payload: Match[] }
  | { type: 'ADD_SCORE'; payload: number };
```

### Animation & Visual Guidelines
- Use CSS transforms for smooth piece movement
- Implement particle effects for match clearing
- Provide visual feedback for user interactions
- Create satisfying juice effects (screen shake, particles)
- Ensure accessibility with reduced motion support

## Development Priorities

### Phase 1: Core Game Engine
1. Grid system and piece generation
2. Basic match detection algorithm
3. Piece swapping and validation
4. Score calculation system

### Phase 2: Game Polish
1. Smooth animations and transitions
2. Sound effects and visual feedback
3. Power-up implementation
4. Level progression system

### Phase 3: Advanced Features
1. Multiplayer support preparation
2. Achievement system
3. Daily challenges
4. Social sharing features

## File Naming & Organization

### Component Naming
- PascalCase for components: `GameBoard.tsx`
- camelCase for hooks: `useGameLogic.ts`
- UPPER_CASE for constants: `GAME_CONFIG.ts`

### CSS/Styling
- Use Tailwind for layout and responsive design
- CSS Modules for game-specific animations
- BEM methodology for complex game components

## Testing Strategy

### Unit Tests
- Game logic functions (match detection, scoring)
- Custom hooks for game state management
- Utility functions for grid operations

### Integration Tests
- Game flow from start to completion
- Score persistence and retrieval
- Power-up activation sequences

### Performance Tests
- Animation frame rate monitoring
- Memory usage during extended gameplay
- Bundle size optimization

## Accessibility Requirements
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences
- Touch/mobile accessibility

## Common Game Development Patterns

### State Management
```typescript
// Zustand store example
interface GameStore {
  grid: DoughnutPiece[][];
  score: number;
  level: number;
  moves: number;
  makeMove: (from: Position, to: Position) => void;
  clearMatches: () => void;
  resetGame: () => void;
}
```

### Animation Patterns
- Use `transform` instead of changing `left/top`
- Implement easing functions for natural movement
- Queue animations to prevent conflicts
- Provide animation skip options for accessibility

## Security & Performance
- Sanitize user inputs for high scores
- Implement client-side game state validation
- Use React.memo and useMemo strategically
- Lazy load non-critical game assets
- Implement proper error recovery

## Deployment Considerations
- Optimize images and game assets
- Implement proper caching strategies
- Use Next.js Image optimization
- Configure proper CSP headers
- Monitor Core Web Vitals

## Debugging & Development Tools
- Use React DevTools for component inspection
- Implement game state debugging utilities
- Add performance monitoring hooks
- Create development-only cheat codes
- Log game events for analytics

Remember: Focus on creating a delightful, performant gaming experience while maintaining clean, maintainable code that follows modern React and Next.js best practices.