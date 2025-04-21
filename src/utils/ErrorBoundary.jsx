import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: "", errorInfo: "" };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        this.setState({ errorInfo: errorInfo.componentStack });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        padding: "20px",
                        backgroundColor: "#ffcccb",
                        borderRadius: "5px",
                    }}
                >
                    <h2>Something went wrong!</h2>
                    <p>{this.state.errorMessage}</p>
                    <pre>{this.state.errorInfo}</pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
