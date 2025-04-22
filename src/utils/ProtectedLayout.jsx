import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
    const user = useSelector((state) => state?.user?.username);

    if (!user) {
        return <Navigate to="/requires-login" replace />
    }

    return <Outlet />;
}

export default ProtectedLayout;