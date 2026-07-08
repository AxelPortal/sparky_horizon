import {createContext, useContext, useState, type ReactNode} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider ({ children }: { children: ReactNode }){
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        navigate('/songs'); // Redirect to dashboard after login
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}