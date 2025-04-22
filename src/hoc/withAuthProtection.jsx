import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const withAuthProtection = (WrappedComponent) => {
    return (props) => {
        const user = useSelector((state) => state.user.username);

        if (!user) {
            return <Navigate to="/requires-login" replace />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuthProtection;
