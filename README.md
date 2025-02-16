# Plateful

## Overview

<a href="https://platefulapp.vercel.app/" target="_blank">
  <img src="/public/featuredimg.png" alt="Featured Image"  />
</a>

Plateful is a **meal planning web application** designed to help users efficiently **manage their food inventory, generate recipes**, and **plan weekly meals**. The app provides a **seamless and intuitive UI** for effortless meal planning, ensuring users can make the most out of their available ingredients.

## Features

- 🥗 **Generate Recipes** based on available ingredients
- 📦 **Manage Inventory** to keep track of stored food items
- 📅 **Weekly Meal Planner** for structuring meals in advance
- 📊 **User-Friendly Dashboard** with recent activity tracking

## Tech Stack

- **Framework:** Next.js (with TypeScript)
- **Routing:** Next.js App Router
- **State Management:** React Context API
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN/UI
- **Deployment:** Vercel

## Project Structure

```
plateful/
├── src/
│   ├── components/      # UI components
│   ├── app/             # Next.js App Router pages
│   ├── hooks/           # Custom React hooks
│   ├── assets/          # Static assets
│   ├── utils/           # Helper functions
│   ├── styles/          # Tailwind CSS styles
│   ├── context/         # Context API state management
│   ├── config.ts        # Configuration settings
│   ├── middleware.ts    # Middleware logic (if any)
│   └── lib/             # Server-side utilities (if needed)
├── public/              # Static files
├── package.json         # Project dependencies
├── README.md            # Documentation
├── next.config.js       # Next.js configuration
└── .gitignore           # Git ignored files
```

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/oguzhanozenc/plateful.git
cd plateful
```

### 2. Install Dependencies

```sh
yarn install
```

### 3. Start the Development Server

```sh
yarn dev
```

Runs the app in development mode. Open `http://localhost:3000/` in your browser.

## Deployment to Vercel

### 1. Build for Production

```sh
yarn build
```

### 2. Deploy to Vercel

- Link your GitHub repository to Vercel
- Set **build command** to `yarn build`
- Deploy your site at `https://platefulapp.vercel.app/`

## Contributing

Contributions are welcome! If you'd like to improve Plateful:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

## License

MIT License © 2025 Oguzhan Ozenc.
