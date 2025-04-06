# Recipe Hub 🍽️

A modern, responsive React application for discovering and searching recipes from around the world. Built with React and powered by TheMealDB API.

## Features

- 🔍 Real-time recipe search with auto-suggestions
- 🌓 Dark/Light theme support
- ⚡ Debounced search for better performance
- 💾 Local caching to minimize API calls
- 📱 Responsive grid layout
- 🎨 Modern UI with Tailwind CSS
- ⌛ Loading states with skeleton screens

## Tech Stack

- React.js
- Tailwind CSS
- Axios for API calls
- React Loading Skeleton
- TheMealDB API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/recipe-hub.git
cd recipe-hub
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
recipe/
├── src/
│   ├── components/
│   │   ├── Home.jsx
│   │   ├── SearchBar.jsx
│   │   └── RecipeCard.jsx
│   ├── ThemeContext.js
│   └── App.js
├── public/
└── package.json
```

## Features in Detail

### Search Functionality
- Real-time search with 500ms debounce
- Auto-suggestions dropdown
- Caches search results for 5 minutes

### Theme Support
- Supports both light and dark themes
- Persists theme preference
- Smooth transitions between themes

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Responsive typography and spacing

## API Integration

This project uses [TheMealDB API](https://www.themealdb.com/api.php) for fetching:
- Recipe searches
- Recipe categories
- Recipe details

## Performance Optimizations

- Debounced search to prevent API spam
- Local storage caching
- Lazy loading of images
- Optimized re-renders using React hooks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

