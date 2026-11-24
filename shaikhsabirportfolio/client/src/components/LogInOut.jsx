import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LogInOut() {
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <>
            {isAdmin}
            {
                isAuthenticated ? ( <button className="bg-red-500 text-white bold p-1 rounded hover:underline" onClick={handleLogout}>Logout</button> ) : ( <Link className="text-blue-500 hover:underline" to="/login">Login</Link> )
            }
        </>

    );
}