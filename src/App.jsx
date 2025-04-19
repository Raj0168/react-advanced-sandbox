import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import Header from './components/Header';

const Home = lazy(() => import('./pages/Home'));
const LazyComponent = lazy(() => import('./pages/LazyComponent'));

function App() {
    return (
        <div style={{ width: '100vw' }}>
            <div className="main-app-header"><Header /></div>
            <Suspense fallback={<div><Loader /></div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/lazy" element={<LazyComponent />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
