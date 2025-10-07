# 🍩 DoughnutVibes

A delicious candy-crush clone game featuring colorful doughnuts! Built with Next.js 15, React 18, TypeScript, and Tailwind CSS.

## 🎮 Game Features

- **Match-3 Gameplay**: Classic match-3 mechanics with doughnut-themed pieces
- **Special Doughnuts**: Power-ups and special pieces with unique effects
- **Smooth Animations**: Buttery smooth 60 FPS gameplay with Framer Motion
- **Progressive Difficulty**: Multiple levels with increasing challenges
- **Score System**: Track your high scores and compete with yourself
- **Responsive Design**: Play on desktop, tablet, or mobile

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start playing!

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + CSS Modules
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Testing**: Jest + React Testing Library

## 📁 Project Structure

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

## 🎨 Doughnut Types

- 🍩 **Classic Glazed**: Basic matching piece
- 🍫 **Chocolate Frosted**: Standard chocolate-themed piece
- ✨ **Sprinkle Special**: Creates line-clearing effects
- 🍓 **Jelly-Filled**: Explodes in cross pattern
- 🌈 **Rainbow Glazed**: Wild card that matches any color
- 👑 **Golden Doughnut**: Rare piece worth bonus points

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🚢 Deployment

Deploy easily on Vercel:

```bash
npm run build
```

## 📝 License

MIT License - feel free to use this project for learning and fun!

---

Made with ❤️ and 🍩 by the DoughnutVibes team
