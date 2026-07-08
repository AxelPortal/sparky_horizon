import {useState, useEffect} from 'react'
import { useAuth } from '../context/AuthContext';
import api from '../service/api';
import {Heart} from 'lucide-react';
import { type Album, type Song } from '../types';


export default function Songs () {

    const [albums, setAlbums] = useState<Album[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const {logout} = useAuth();

    useEffect(() => {
        api.get('/albums')
            .then(response => {
                setAlbums(response.data);
            })
            .catch(error => {
                console.error('Error fetching albums:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedAlbum) {
            api.get(`/albums/${selectedAlbum.id}/songs`)
                .then(response => {
                    setSongs(response.data);
                })
                .catch(error => {
                    console.error('Error fetching songs:', error);
                });
        }

    }, [selectedAlbum]);

    const addFavorite = async (songId: number) => {
        await api.post(`/user/favorites`, { songId });
        alert('Canción agregada a favoritos');

    };


    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold mb-4">Álbumes</h1>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600 transition duration-300">
                    Cerrar sesión
                </button>
            </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {albums.map(album => (
                        <div key={album.id} onClick={() => setSelectedAlbum(album)} className="cursor-pointer p-4 border rounded hover:bg-gray-100 transition duration-300">
                            <img src={album.coverUrl} alt={album.title} className="w-full h-48 object-cover mb-2 rounded" />
                            <h3 className="text-lg font-semibold">{album.title}</h3>
                            <p className="text-gray-600">{album.year}</p>
                        </div>
                    ))}
                </div>
                
                { selectedAlbum && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Canciones de {selectedAlbum.title}</h2>
                        <div className="space-y-4">
                            {songs.map(song => (
                                <div key={song.id} className="flex items-center justify-between p-4 border rounded hover:bg-gray-100 transition duration-300">
                                    <div>
                                        <h3 className="text-lg font-semibold">{song.title}</h3>
                                        <p className="text-gray-600">{song.duration}</p>
                                    </div>
                                    <button onClick={() => addFavorite(song.id)} className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                                        <Heart/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
    );

}