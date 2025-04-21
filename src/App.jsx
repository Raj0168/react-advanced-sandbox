// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Loader from './components/Loader';
import Header from './components/Header';
import ErrorBoundary from './utils/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const LazyComponent = lazy(() => import('./pages/LazyComponent'));
const FetchPage = lazy(() => import('./pages/FetchPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const RickAndMorty = lazy(() => import('./pages/RickAndMorty'));

const PagesLayout = () => <Outlet />;

function App() {
    return (
        <div style={{ width: '100%', overflowX: 'hidden' }}>
            <Header />

            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* /pages */}
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

                    <Route path="/search" element={<SearchPage />} />

                    <Route
                        path="/rick-and-morty"
                        element={
                            <ErrorBoundary>
                                <RickAndMorty />
                            </ErrorBoundary>
                        }
                    />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
