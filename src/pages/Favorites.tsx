import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../service/api';
import { type Song } from '../types';

export default function Favorites() {
  const [favorites, setFavorites] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    api.get('/user/favorites')
      .then((response) => {
        setFavorites(response.data);
        localStorage.setItem('favorites', JSON.stringify(response.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);
        setFavorites(savedFavorites);
        setLoading(false);
      });
  }, []);

  const removeFavorite = async (songId: number) => {
    try {
      await api.delete(`/user/favorites/${songId}`);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }

    const updatedFavorites = favorites.filter((fav) => fav.id !== songId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    alert('Cancion eliminada de favoritos');
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-4">Tus Favoritos</h1>

          {loading && <p className="text-gray-600">Cargando favoritos...</p>}

          {!loading && favorites.length === 0 && (
            <p className="text-gray-600">Aun no tienes canciones favoritas.</p>
          )}

          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="flex items-center justify-between p-4 border rounded mb-2 hover:bg-gray-100 transition duration-300"
            >
              <div>
                <h3 className="text-lg font-semibold">{fav.title}</h3>
                <p className="text-gray-600">{fav.duration}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFavorite(fav.id)}
                className="text-red-500 hover:text-red-700 transition duration-300"
                aria-label={`Eliminar ${fav.title} de favoritos`}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
