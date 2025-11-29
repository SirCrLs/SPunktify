import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);

  // Cargar playlists guardadas
  useEffect(() => {
    async function loadPlaylists() {
      try {
        const saved = await AsyncStorage.getItem("playlists");
        if (saved) {
          setPlaylists(JSON.parse(saved));
        } else {
          setPlaylists([
            { id: "1", name: "Favorites", songs: [] }
          ]);
        }
      } catch (e) {
        console.log("Error loading playlists:", e);
      }
    }

    loadPlaylists();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  function addSongToPlaylists(songId, playlistIds) {
    setPlaylists(prev =>
      prev.map(pl =>
        playlistIds.includes(pl.id)
          ? {
              ...pl,
              songs: pl.songs.includes(songId)
                ? pl.songs
                : [...pl.songs, songId]
            }
          : pl
      )
    );
  }

  function createPlaylist(name) {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songs: []
    };
    setPlaylists(prev => [...prev, newPlaylist]);
  }

  function deletePlaylist(id) {
    setPlaylists(prev => prev.filter(pl => pl.id !== id));
  }

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        addSongToPlaylists,
        createPlaylist,
        deletePlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
