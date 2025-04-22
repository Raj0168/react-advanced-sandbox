# React Advanced Sandbox

A developer-friendly sandbox app built with **ReactJS** to explore and demonstrate **advanced React concepts**.  
This repository is **open-source** and created as a learning resource for developers looking to level up their React skills by referring to real-world patterns and implementations.

---

## Live Demo

[View the App](https://Raj0168.github.io/react-advanced-sandbox/)

---

## Features & Concepts Covered

This application showcases a variety of **modern React practices**, including but not limited to:

### Core React

- `useState`, `useEffect`, `useRef`, `useContext`
- Conditional rendering, list rendering, and dynamic component loading

### Advanced Hooks & Optimization

- **Custom Hooks** for reusable logic
- `useMemo` and `useCallback` to optimize performance
- `React.memo` and `PureComponent` to prevent unnecessary re-renders
- **Error Boundaries** to gracefully handle component-level crashes

### State Management

- **Redux Toolkit** for global state
- **redux-persist** for localStorage/sessionStorage persistence
- Coexistence with **Context API** for scoped state

### Code Splitting & Lazy Loading

- `React.lazy` + `Suspense` for route-level and component-level code splitting

### Performance

- **react-window** and **react-window-infinite-loader** for virtualization of large lists
- **AutoSizer** for responsive grid layouts
- Infinite scrolling and pagination

### UI & Styling

- **Material UI (MUI)** for a consistent and accessible component design
- Fully responsive and optimized for different screen sizes
- Built using **Vite** for faster builds and modern tooling

---

## Home Page Features

The **Home Page** in this application is designed to showcase several key concepts and interactive features:

### Dynamic Content Display

- Various React concepts are presented on the home page with **motion effects** using `framer-motion` for smooth transitions and animations.

### Concept Exploration

- **Concepts List**: On the homepage, there is a list of React concepts like `useMemo`, `useCallback`, `React.memo`, and others. Each concept has a dedicated button that opens a **modal** with a detailed explanation and usage example, utilizing motion effects for smooth interaction.

### Interactive Exploration

- The page also has a section where users can explore individual **React concepts** and their **details** by clicking on cards that open detailed explanations in modals with motion animations.
- The page is fully **responsive**, with content adjusting based on the screen size. **Grid layouts** change from desktop to mobile view, providing a clean and intuitive design.

### Home Page Structure

- The **"Explore Pages"** section dynamically loads pages with relevant React topics, including pages for exploring state management, advanced hooks, and performance optimizations.

- The **page elements** are revealed on scroll from left and right, using **motion** animations to enhance user experience.

- **Protected Route**: A protected route section uses fade-in transitions when accessed, adding extra interaction dynamics.

---

## Folder Structure (Simplified)

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

---

## Deployment

    Install `gh-pages` as a development dependency:
            ```bash
            npm install gh-pages --save-dev
            npm run deploy
            ```

Future Plans: 

Enhance Performance: Ongoing improvements in optimizing large datasets and further reducing render times.

Interactive Demos: More interactive tutorials or examples on how each concept can be applied in real-world applications.

Better Mobile Experience: Continued refinement of mobile responsiveness for all app components.
