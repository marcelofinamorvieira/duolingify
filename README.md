# 🎯 Duolingo-Style Quiz App

A gamified quiz application inspired by Duolingo's engaging learning experience. Transform any subject into an interactive, fun learning journey with streaks, lives, XP points, and achievements.

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.7-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎮 Gamification Elements
- **Lives System** - Start with 3 hearts, lose one for each wrong answer
- **Timer** - 60-second countdown per question adds excitement
- **Streak Counter** - Build momentum with consecutive correct answers
- **XP Points** - Earn experience for correct answers and streaks
- **Sound Effects** - Engaging audio feedback (can be toggled on/off)
- **Haptic Feedback** - Mobile vibration support for enhanced interaction
- **Progress Tracking** - Persistent local storage saves your journey

### 🎨 Beautiful UI/UX
- **Duolingo-Inspired Design** - Clean, colorful, and motivating interface
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Layout** - Perfect on mobile, tablet, and desktop
- **Celebration Effects** - Confetti animation for achievements
- **Visual Feedback** - Immediate response to user actions

### 📚 Learning Features
- **Custom Categories** - Organize questions by topic
- **Difficulty Levels** - Easy, Medium, and Hard questions
- **Answer Explanations** - Learn from mistakes with detailed explanations
- **Review Mode** - Study your incorrect answers
- **Bookmarks** - Save questions for later review
- **Progress Reset** - Start fresh whenever you want

## 🚀 Getting Started

### Prerequisites
- Node.js 20.9+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/duolingo-style-quiz.git
cd duolingo-style-quiz
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Creating Your Own Quizzes

The app accepts questions in JSON format. Click the import button (⬇️) on the start screen to load your questions.

### Question Format

```json
[
  {
    "id": 1,
    "question": "What is the capital of France?",
    "options": {
      "A": "London",
      "B": "Berlin",
      "C": "Paris",
      "D": "Madrid"
    },
    "correctAnswer": "C",
    "explanation": "Paris has been the capital of France since 987 AD.",
    "category": "Geography",
    "difficulty": "easy"
  }
]
```

### Field Requirements

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier for each question |
| `question` | string | The question text |
| `options` | object | Answer choices (A, B, C, D) |
| `correctAnswer` | string | Must be "A", "B", "C", or "D" |
| `explanation` | string | Shown after answering |
| `category` | string | Topic grouping |
| `difficulty` | string | "easy", "medium", or "hard" |

Answer labels in JSON stay `A`, `B`, `C`, and `D`. The app randomizes their display order at the start of each quiz pass while keeping `correctAnswer` attached to the same answer text.

### Example Categories

You can create quizzes for any subject:
- 📐 **Mathematics**: Algebra, Geometry, Calculus
- 🧪 **Science**: Biology, Chemistry, Physics
- 📜 **History**: Ancient History, World Wars, Modern History
- 🗣️ **Languages**: Grammar, Vocabulary, Literature
- 💻 **Programming**: JavaScript, Python, Data Structures
- 🎨 **Arts**: Music Theory, Art History, Film Studies
- 🌍 **Geography**: Countries, Capitals, Landmarks

## 🛠️ Development

### Tech Stack
- **Frontend Framework**: Next.js 16.2.9 with App Router
- **UI Library**: React 19.2.7
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4.0
- **Animations**: Framer Motion 12.18.1
- **Audio**: Howler.js 2.2.4

### Project Structure
```
quiz-app/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Quiz.tsx          # Main quiz logic
│   ├── StartScreen.tsx   # Landing screen
│   ├── QuizScreen.tsx    # Question display
│   └── ...              # Other components
├── hooks/                # Custom React hooks
├── types/               # TypeScript definitions
└── public/              # Static assets
    └── sounds/         # Audio files
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 Use Cases

- **Education**: Teachers creating interactive lessons
- **Corporate Training**: Onboarding and skill assessments
- **Language Learning**: Vocabulary and grammar practice
- **Certification Prep**: Study for exams gamified
- **Trivia Games**: Fun knowledge competitions
- **Personal Learning**: Self-study any topic

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Duolingo](https://www.duolingo.com/)'s amazing gamification design
- Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ by developers who believe learning should be fun!