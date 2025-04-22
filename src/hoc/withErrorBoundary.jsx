import React from 'react';
import ErrorBoundary from '../utils/ErrorBoundary';

const withErrorBoundary = (Component) => (props) => (
    <ErrorBoundary>
        <Component {...props} />
    </ErrorBoundary>
);

export default withErrorBoundary;
