import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

const Header = lazy(() => import('./components/Header'));
const ErrorBoundary = lazy(() => import('./utils/ErrorBoundary'));
const ProtectedLayout = lazy(() => import('./utils/ProtectedLayout'));

const Home = lazy(() => import('./pages/Home'));
const LazyComponent = lazy(() => import('./pages/LazyComponent'));
const FetchPage = lazy(() => import('./pages/FetchPage'));
const RickAndMorty = lazy(() => import('./pages/RickAndMorty'));
const MeowPage = lazy(() => import('./pages/MeowPage'));
const FloorMapPage = lazy(() => import('./pages/FloorMapPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const UserDetails = lazy(() => import('./pages/UserDetails'));
const RequiresLogin = lazy(() => import('./pages/RequiresLogin'));

import withAuthProtection from "./hoc/withAuthProtection";
import SkeletonFallback from './utils/SkeletonFallback';
import ProtectedPages from './pages/ProtectedPages';

const ProtectedUserDetails = withAuthProtection(UserDetails);

const PagesLayout = () => <Outlet />;

function App() {
    return (
        <Suspense fallback={<SkeletonFallback />}>
            <div style={{ width: '100%', overflowX: 'hidden' }}>
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Nested Pages */}
                    <Route path="pages" element={<PagesLayout />}>
                        <Route
                            path="fetch"
                            element={
                                <ErrorBoundary>
                                    <FetchPage />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="lazy"
                            element={
                                <ErrorBoundary>
                                    <LazyComponent />
                                </ErrorBoundary>
                            }
                        />
                    </Route>

                    {/* Protected Routes */}
                    <Route element={<ProtectedLayout />}>
                        <Route path="/meow-page" element={<MeowPage />} />
                        <Route path="/floor-map" element={<FloorMapPage />} />
                    </Route>

                    {/* Protected HOC Routes */}
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/user-details" element={<ProtectedUserDetails />} />
                    <Route path="/requires-login" element={<RequiresLogin />} />

                    <Route path="/protected" element={<ProtectedPages />} />

                    <Route
                        path="/rick-and-morty"
                        element={
                            <ErrorBoundary>
                                <RickAndMorty />
                            </ErrorBoundary>
                        }
                    />
                </Routes>
            </div>
        </Suspense>
    );
}

export default App;
