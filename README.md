# Plateful

## Overview

<a href="https://platefulapp.netlify.app/" target="_blank">
  <img src="/public/featuredimg.png" alt="Featured Image"  />
</a>

Plateful is a **meal planning web application** designed to help users efficiently **manage their food inventory, generate recipes**, and **plan weekly meals**. The app provides a **seamless and intuitive UI** for effortless meal planning, ensuring users can make the most out of their available ingredients.

## Features

- 🥗 **Generate Recipes** based on available ingredients
- 📦 **Manage Inventory** to keep track of stored food items
- 📅 **Weekly Meal Planner** for structuring meals in advance
- 📊 **User-Friendly Dashboard** with recent activity tracking

## Tech Stack

- **Frontend:** React (with TypeScript), ShadCN/UI
- **Routing:** React Router
- **State Management:** React Context API
- **Styling:** Tailwind CSS
- **Deployment:** Netlify

## Project Structure

```
plateful/
├── src/
│   ├── components/      # UI components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── assets/          # Static assets
│   ├── utils/           # Helper functions
│   ├── styles/          # Tailwind CSS styles
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Entry point
│   ├── context/         # Context API state management
│   └── config.ts        # Configuration settings
├── public/              # Static files
├── package.json         # Project dependencies
├── README.md            # Documentation
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

Runs the app in development mode. Open `http://localhost:5173/` in your browser.

## Deployment to Netlify

### 1. Build for Production

```sh
yarn build
```

### 2. Deploy to Netlify

- Link your GitHub repository to Netlify
- Set **build command** to `yarn build`
- Set **publish directory** to `dist/`
- Deploy your site at `https://platefulapp.netlify.app/`

## Contributing

Contributions are welcome! If you'd like to improve Plateful:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

## License

MIT License © 2025 Oguzhan Ozenc.
