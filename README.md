# 🧠 React Advanced Sandbox

A developer-friendly sandbox app built with **ReactJS** to explore and demonstrate **advanced React concepts**.  
This repository is **open-source** and created as a learning resource for developers looking to level up their React skills by referring to real-world patterns and implementations.

---

## 🚀 Live Demo

🌐 [View the App](https://Raj0168.github.io/react-advanced-sandbox/)

---

## 📚 Features & Concepts Covered

This application showcases a variety of **modern React practices**, including but not limited to:

### 🧩 Core React

- `useState`, `useEffect`, `useRef`, `useContext`
- Conditional rendering, list rendering, and dynamic component loading

### ⚒️ Advanced Hooks & Optimization

- **Custom Hooks** for reusable logic
- `useMemo` and `useCallback` to optimize performance
- `React.memo` and `PureComponent` to prevent unnecessary re-renders
- **Error Boundaries** to gracefully handle component-level crashes

### 🧠 State Management

- **Redux Toolkit** for global state
- **redux-persist** for localStorage/sessionStorage persistence
- Coexistence with **Context API** for scoped state

### 🌀 Code Splitting & Lazy Loading

- `React.lazy` + `Suspense` for route-level and component-level code splitting

### 🧮 Performance

- **react-window** and **react-window-infinite-loader** for virtualization of large lists
- **AutoSizer** for responsive grid layouts
- Infinite scrolling and pagination

### 💅 UI & Styling

- **Material UI (MUI)** for a consistent and accessible component design
- Fully responsive and optimized for different screen sizes
- Built using **Vite** for faster builds and modern tooling

---

## 📁 Folder Structure (Simplified)

src/
│
├── components/ # Reusable components (Cards, Modals, Loaders)
├── hooks/ # Custom React hooks
├── pages/ # Character and Location views
├── store/ # Redux slices and configuration
├── utils/ # Helper functions and constants
├── App.jsx # Main app component with routes and layout
├── main.jsx # Vite entry point
└── index.css / styles/ # Global and SCSS styling



npm install gh-pages --save-dev
npm run deploy