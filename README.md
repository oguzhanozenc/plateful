# Plateful

## Overview

<a href="https://platefulapp.vercel.app/" target="_blank">
  <img src="/public/featuredimg.png" alt="Featured Image"  />
</a>

Plateful is a **meal planning web application** that uses **AI (Claude + Hugging Face)** and public recipe data to help users efficiently **manage their food inventory**, **generate recipes**, and **plan weekly meals**. The app offers a **seamless and intuitive UI** for organizing meals around available ingredients, making food planning more intelligent, personalized, and time-efficient.

## Features

- 🥗 **Generate Recipes** using Claude + Hugging Face (AI) or Spoonacular's public recipe database
- 📦 **Manage Pantry Inventory** with ingredient tracking, categorization, and real-time updates
- 📅 **Weekly Meal Planner** with drag-to-schedule features and calendar-based navigation
- 🔁 **Debounced & Cached API Requests** to prevent rate limits and optimize performance
- 🔒 **Secure API Integration** with server-only handling for Claude, Hugging Face, and Spoonacular keys
- 🧠 **Modular State Management** with scoped React Context providers
- 🧾 **Clean Markdown Recipe Rendering** via `react-markdown`, `remark-gfm`, and `rehype-sanitize`
- 📊 **User-Friendly Dashboard** with recent activity tracking and streamlined navigation

## Tech Stack

- **Framework:** Next.js 15 (with TypeScript)
- **Routing:** Next.js App Router
- **State Management:** React Context API (modular, scoped)
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN/UI
- **Deployment:** Vercel
- **AI Services:** Anthropic Claude, Hugging Face Inference API
- **Data APIs:** Spoonacular API
- **Markdown Rendering:** react-markdown, remark-gfm, rehype-sanitize

## Project Structure

```bash
plateful/
├── app/                     # App Router directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── not-found.tsx        # 404 page
│   ├── api/                 # Server-side API handlers
│   │   ├── recipes/route.ts
│   │   └── ...
│   ├── create-recipe/page.tsx
│   ├── generate-recipe/page.tsx
│   ├── inventory/page.tsx
│   ├── recipes/page.tsx
│   ├── shopping-list/page.tsx
│   └── weekly-planner/page.tsx
│
├── components/              # Shared UI components
│
├── context/                 # Modular React Contexts
│   ├── InventoryContext.tsx
│   ├── CalendarContext.tsx
│   ├── MealPlannerContext.tsx
│
├── hooks/                   # Custom hooks
│   ├── useRecipes.ts
│   └── useRecipeDetails.ts
│
├── lib/                     # Helpers
│   ├── api.ts
│   └── utils.ts
│
├── public/                  # Static assets
│   ├── logo.png
│   └── featuredimg.png
│
├── styles/                  # Tailwind global styles
│   └── global.css
│
├── types/                   # TypeScript types
│
├── ui/                      # ShadCN-styled components
│   ├── button.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   ├── select.tsx
│   ├── Title.tsx
│   ├── SaveToPlannerModal.tsx
│   ├── PlannerCell.tsx
│   └── RecentActivityCard.tsx
│
├── .gitignore
├── eslint.config.js
├── next-env.d.ts
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/oguzhanozenc/plateful.git
cd plateful
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Start the Development Server

```bash
yarn dev
```

Open your browser at `http://localhost:3000/`.

## Deployment to Vercel

### 1. Build for Production

```bash
yarn build
```

### 2. Deploy to Vercel

- Link your GitHub repository to Vercel
- Set **Build Command**: `yarn build`
- Set **Output Directory**: `.next`
- Deploy at: `https://platefulapp.vercel.app/`

## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to GitHub (`git push origin feature-branch`)
5. Create a Pull Request

## License

MIT License © 2025 Oguzhan Ozenc