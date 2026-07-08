import {Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {PlaySquare, Heart, LogOut} from "lucide-react";

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white p-2 flex items-center justify-between">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/songs" className="flex items-center gap-2 text-xl font-bold hover:text-gray-300 transition duration-300">
                    <PlaySquare/> Sparky The Horizon
                </Link>
                <div className="flex items-center gap-10">
                    <Link to="/songs" className="flex items-center gap-1 hover:text-gray-300 transition duration-300">
                    Albumes y Canciones
                    </Link>
                    <Link to="/favorites" className="flex items-center gap-1 hover:text-gray-300 transition duration-300">
                        <Heart size={20}/> Favoritos
                    </Link>
                    <button onClick={logout} className="flex items-center gap-1 hover:text-gray-300 transition duration-300">
                        <LogOut size={20}/> Salir
                    </button>
                </div>
            </div>
        </nav>
    );


}