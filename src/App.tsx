import { type ReactNode } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Songs from './pages/Songs';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/songs" element={<ProtectedRoute><Songs /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );

}
