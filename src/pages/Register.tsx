import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../service/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica de Frontend
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, verifica.");
      return;
    }

    try {
      // Llamada al backend para crear el usuario
      await api.post('/auth/register', { name, email, password });
      
      alert("¡Usuario creado con éxito! Ahora puedes iniciar sesión.");
      navigate('/login'); // Redirigimos al Login tras el éxito
      
    } catch (error: any) {
      // Manejo de errores (ej. si el usuario ya existe)
      const errorMessage = error.response?.data?.error || "Error al registrarse. Inténtalo de nuevo.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-900 p-8 rounded-xl shadow-2xl w-96 border border-gray-800"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-500">Únete a SparkyRoll</h2>
        <p className="text-gray-400 text-center mb-6">Crea tu cuenta para guardar tus favoritos</p>

        <input 
          type="text" 
          placeholder="Nombre completo" 
          value={name} 
          onChange={e => setName(e.target.value)}
          className="w-full mb-4 bg-gray-800 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required
        />

        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 bg-gray-800 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required
        />
        
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 bg-gray-800 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required
        />

        <input 
          type="password" 
          placeholder="Confirma tu contraseña" 
          value={confirmPassword} 
          onChange={e => setConfirmPassword(e.target.value)}
          className="w-full mb-6 bg-gray-800 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required
        />

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded font-bold transition-colors shadow-lg shadow-blue-500/30"
        >
          Registrarse
        </button>

        <p className="mt-4 text-center text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
}