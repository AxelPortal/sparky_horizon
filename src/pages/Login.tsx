import {useState} from 'react'
import { useAuth } from '../context/AuthContext';
import api from '../service/api';
import {Link} from 'react-router-dom';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const res = await api.post('/auth/login', { email, password });
            login(res.data.token);
        }
        catch (error: any){
            const errorMessage = error.response?.data?.error || error.message;
            alert(`Error en Login: ${errorMessage}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Sparky The Horizon</h2>
                <input
                    type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300">
                    Entrar
                </button>
                <p className="mt-4 text-center text-gray-600">
                    ¿No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:underline">Regístrate</Link>
                </p>
            </form>

        </div>
    );

}