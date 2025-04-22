import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Stack,
    Divider,
    Avatar,
    useTheme,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import CodeIcon from "@mui/icons-material/Code";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import MemoryIcon from "@mui/icons-material/Memory";
import LayersIcon from "@mui/icons-material/Layers";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import StorageIcon from "@mui/icons-material/Storage";
import PeopleIcon from "@mui/icons-material/People";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import SpeedIcon from "@mui/icons-material/Speed";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch } from "react-redux";
import { showReduxSnackbar } from "../store/slices/snackbarSlice";
import { Link } from "react-router-dom";
import ExpandableList from "../components/ExpandableList";
import ConceptDetailModal from "../components/ConceptDetailModal";
import { motion } from "framer-motion";

const pages = [
    {
        label: "Fetch Component",
        to: "/pages/fetch",
        description: "Custom hooks + Axios for paginated data fetching.",
    },
    {
        label: "Search Page",
        to: "/search",
        description: "Debounce, throttle, and Redux‑powered search UI.",
    },
    {
        label: "R & M",
        to: "/rick-and-morty",
        description: "Infinite scroll, React.memo, and virtualization.",
    },
    {
        label: "Protected Pages",
        to: "/protected",
        description: "Route protection via HOC & Outlet layout.",
    },
    {
        label: "Lazy Component",
        to: "/pages/lazy",
        description: "React.lazy + Suspense for on‑demand loading.",
    },
];

const conceptItems = [
    {
        label: "Custom Hooks",
        icon: <CodeIcon />,
        detail:
            "Custom hooks let you extract and reuse stateful logic across components. For example, you can create a `useFetch` hook that handles data fetching, loading, and error states in one place. Custom hooks improve code readability, reduce duplication, and enforce consistent behavior across your application. They follow the same rules as built‑in hooks, so they must start with “use” and can call other hooks. This pattern is especially powerful for abstracting concerns like form handling, animations, subscriptions, and more. With React 18’s concurrent features, custom hooks can also coordinate more advanced patterns like data fetching with Suspense or transitions.",
    },
    {
        label: "Lazy Loading",
        icon: <HourglassEmptyIcon />,
        detail:
            "Lazy loading is the practice of deferring the creation or downloading of non‑critical resources until they're actually needed. In React, you achieve this with `React.lazy` and `<Suspense>`. When a component is wrapped in `React.lazy`, its code bundle is only fetched when the component is first rendered. This dramatically reduces your initial bundle size, improving page‑load performance. Combined with route‑based code splitting, you can split your application by feature, ensuring users only download what they need when they navigate. Remember to provide a fallback UI via `<Suspense fallback={...}>` to keep the UX smooth while code is being loaded.",
    },
    {
        label: "useMemo & useCallback",
        icon: <MemoryIcon />,
        detail:
            "`useMemo` and `useCallback` help optimize React re‑renders by memoizing expensive computations and function references. `useMemo` runs a function only when its dependencies change, returning a cached value otherwise. This is useful for heavy calculations or derived state. `useCallback` memoizes a function definition so it won’t be re‑created on every render unless dependencies change, which is critical when passing callbacks to child components that rely on referential equality (e.g., `React.memo`). Overusing these can introduce complexity, so apply them where profiling shows performance bottlenecks.",
    },
    {
        label: "React.memo / PureComponent",
        icon: <LayersIcon />,
        detail:
            "`React.memo` (for function components) and `PureComponent` (for class components) prevent unnecessary re‑renders by performing a shallow comparison of props. If the props haven’t changed, React reuses the previous render. This is a quick win for performance in list items, cards, and other pure UI components. However, be mindful: deep objects or inline functions will always be seen as changed. Combine memoization strategies (like `useCallback` and `useMemo`) to ensure memoized components truly skip renders.",
    },
    {
        label: "React Window",
        icon: <ViewInArIcon />,
        detail:
            "When rendering large lists (hundreds or thousands of items), performance suffers due to the DOM size. `react-window` solves this via virtualization: only the items visible in the viewport are rendered, while off‑screen items are unmounted. This drastically reduces the number of DOM nodes and speeds up rendering. You specify item size and container size, and `react-window` handles the rest. Combining this with `InfiniteLoader` lets you fetch more data as the user scrolls, creating a smooth infinite scroll experience even with massive datasets.",
    },
    {
        label: "Redux & Persist",
        icon: <StorageIcon />,
        detail:
            "Redux is a predictable state container for JavaScript apps. With `@reduxjs/toolkit`, you get opinionated defaults (like `createSlice`, `createAsyncThunk`, and immutable state updates) for faster development. `redux-persist` lets you save Redux state to `localStorage` (or other storage engines), so your app’s state survives page reloads. You configure a `persistReducer` and blacklist or whitelist slices. On rehydration, your UI can pick up right where it left off, improving UX for revisits and offline scenarios.",
    },
    {
        label: "Context API",
        icon: <PeopleIcon />,
        detail:
            "React’s Context API passes data through the component tree without manually threading props at every level. You create a `Context`, wrap parts of your tree in a `Provider`, and consume values with `useContext`. This is perfect for theming, localization, or user authentication state. However, excessive context usage can trigger broad re‑renders—so split contexts per concern or combine with memoization to avoid performance pitfalls.",
    },
    {
        label: "Error Boundaries",
        icon: <ReportProblemIcon />,
        detail:
            "Error boundaries catch JavaScript errors in their child component tree and display a fallback UI instead of crashing the whole app. You implement one by creating a class component with `static getDerivedStateFromError` and `componentDidCatch`. Wrap critical parts of your tree in `<ErrorBoundary>` so that runtime errors in UI components (but not in event handlers) don’t break the entire application. Combine with Sentry or other logging tools to report errors while providing a graceful user experience.",
    },
    {
        label: "Debounce & Throttle",
        icon: <SpeedIcon />,
        detail:
            "Debouncing and throttling control how frequently a function runs in response to rapid events (like keystrokes or scroll). Debounce delays invocation until a period of inactivity—great for search inputs. Throttle ensures a function runs at most once every n milliseconds—ideal for scroll or resize handlers. You can implement these with custom hooks (e.g., `useDebounce` or `useThrottle`) or utility libraries like Lodash (`_.debounce`, `_.throttle`). They smooth performance and reduce unnecessary API calls.",
    },
    {
        label: "Intersection Observer",
        icon: <VisibilityIcon />,
        detail:
            "The Intersection Observer API asynchronously observes changes in the intersection of a target element with its ancestor or viewport. In React, you can wrap it in a hook (e.g., `useOnScreen`) to trigger animations, lazy‑load images, or infinite‑scroll more data as users approach the bottom of a list. Because it’s native and efficient, it’s preferred over manual scroll listeners for viewport‑based logic.",
    },
    {
        label: "React Router",
        icon: <LaunchIcon />,
        detail:
            "React Router v6 enables dynamic routing in your app. With `<Routes>` and `<Route>`, you declare your route tree, nested routes, and layout wrappers. The `useNavigate` hook replaces `history.push`, and `Outlet` renders nested route children. This modular approach works hand‑in‑hand with code splitting and lazy loading to ensure only needed route code is fetched on demand.",
    },
    {
        label: "Framer Motion",
        icon: <VisibilityIcon />,
        detail:
            "Framer Motion is a production‑ready motion library for React, providing simple APIs like `motion.div`, variants, and gestures. You can animate entrance, exit, layout changes, and gestures declaratively. In this sandbox, it powers scroll‑triggered fades, sliding cards, and modal animations—making your UI feel alive without wrestling with CSS keyframes or imperative code.",
    },
];

const hocPages = [{ page: "ProtectedUserDetails", route: "/user-details" }];
const outletPages = [
    { page: "MeowPage", route: "/meow-page" },
    { page: "FloorMapPage", route: "/floor-map" },
];

export default function Home() {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [selected, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleLiveButton = () =>
        dispatch(
            showReduxSnackbar({ message: "You're on the live page!", severity: "info" })
        );

    const handleConceptClick = (concept) => {
        setSelected(concept);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const slideLeft = { initial: { x: -100, opacity: 0 }, whileInView: { x: 0, opacity: 1 } };
    const slideRight = { initial: { x: 100, opacity: 0 }, whileInView: { x: 0, opacity: 1 } };
    const fade = { initial: { opacity: 0 }, whileInView: { opacity: 1 } };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <motion.div {...fade} transition={{ duration: 0.8 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    React Advanced Sandbox
                </Typography>
            </motion.div>
            <motion.div {...fade} transition={{ duration: 0.8, delay: 0.2 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    A comprehensive sandbox demonstrating dozens of React patterns—from data fetching and
                    component memoization to routing, state management, virtualization, and animations. Dive
                    in, click any concept to learn more, or explore the live pages below—all optimized for
                    performance and dev experience.
                </Typography>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.8, delay: 0.4 }}>
                <Stack direction="row" spacing={2} my={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<GitHubIcon />}
                        href="https://github.com/Raj0168/react-advanced-sandbox"
                        target="_blank"
                        sx={{ boxShadow: 3, ":hover": { boxShadow: 6 } }}
                    >
                        GitHub Repo
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<LaunchIcon />}
                        onClick={handleLiveButton}
                        sx={{ boxShadow: 3, ":hover": { boxShadow: 6 } }}
                    >
                        Live Preview
                    </Button>
                </Stack>
            </motion.div>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" mb={2}>
                Core Concepts
            </Typography>
            <Grid container spacing={3}>
                {conceptItems.map((con, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                        <motion.div
                            {...(i % 2 === 0 ? slideLeft : slideRight)}
                            transition={{ duration: 0.6, delay: 0.1 * i }}
                            viewport={{ once: true }}
                        >
                            <Card
                                onClick={() => handleConceptClick(con)}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: theme.palette.mode === "light" ? "grey.100" : "grey.900",
                                    ":hover": { boxShadow: 4, cursor: "pointer" },
                                    transition: "box-shadow 0.3s ease",
                                }}
                            >
                                <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                                    {con.icon}
                                </Avatar>
                                <Typography>{con.label}</Typography>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <Divider sx={{ my: 6 }} />

            <Typography variant="h5" mb={2}>
                Explore Pages
            </Typography>
            <Grid container spacing={4}>
                {pages.map((page, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                        <motion.div
                            {...(i % 2 === 0 ? slideRight : slideLeft)}
                            transition={{ duration: 0.6, delay: 0.2 * i }}
                            viewport={{ once: true }}
                        >
                            <Card
                                variant="outlined"
                                sx={{
                                    height: "100%",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    ":hover": { transform: "scale(1.02)", boxShadow: 6 },
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        component={Link}
                                        to={page.to}
                                        sx={{ textDecoration: "none", color: "primary.main", display: "block" }}
                                    >
                                        {page.label}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mt={1}>
                                        {page.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <Divider sx={{ my: 6 }} />

            <motion.div {...fade} transition={{ duration: 0.7, delay: 1.3 }} viewport={{ once: true }}>
                <ExpandableList
                    title="Outlet Components"
                    items={outletPages.map((o) => ({ label: o.page, route: o.route }))}
                />
            </motion.div>
            <motion.div {...fade} transition={{ duration: 0.7, delay: 1.2 }} viewport={{ once: true }}>
                <ExpandableList
                    title="Protected Components"
                    items={hocPages.map((h) => ({ label: h.page, route: h.route }))}
                />
            </motion.div>

            <Box mt={8}>
                <motion.div {...fade} transition={{ duration: 0.7, delay: 1.5 }} viewport={{ once: true }}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        💡 This sandbox is open‑source—clone, explore, and contribute! Built to teach and
                        demonstrate real‑world React patterns end‑to‑end.
                    </Typography>
                </motion.div>
            </Box>

            <ConceptDetailModal
                open={modalOpen}
                onClose={closeModal}
                concept={selected}
            />
        </Container>
    );
}
