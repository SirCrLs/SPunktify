import React, { useEffect, useState, useContext, useRef } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView 
} from "react-native";

import { PlayerContext } from "../context/playerContext";
import albumsJSON from "../data/albums.json";
import songsJSON from "../data/songs.json";

function fixWebUrl(url) {
  return url?.split(" ").join("%20");
}

export default function HomeScreen() {
  const { playSong } = useContext(PlayerContext);

  // 🔥 Se guardan una sola vez (no cambian aunque navegues entre screens)
  const randomAlbumsRef = useRef(null);
  const randomSongsRef = useRef(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!randomAlbumsRef.current) {
      const shuffledAlbums = [...albumsJSON].sort(() => Math.random() - 0.5);
      randomAlbumsRef.current = shuffledAlbums.slice(0, 6);
    }

    if (!randomSongsRef.current) {
      const shuffledSongs = [...songsJSON].sort(() => Math.random() - 0.5);
      randomSongsRef.current = shuffledSongs.slice(0, 10);
    }

    setReady(true);
  }, []);

  if (!ready) return null;

  const randomAlbums = randomAlbumsRef.current;
  const randomSongs = randomSongsRef.current;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      {/* 🔹 GRID 6 ALBUMES (2 columnas manuales) */}
      <View style={styles.albumGrid}>
        {randomAlbums.map((item) => (
          <TouchableOpacity key={item.id} style={styles.albumRow}>
            <Image
              source={{ uri: fixWebUrl(item.cover) }}
              style={styles.albumCover}
            />
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={styles.albumName}>{item.name}</Text>
              <Text numberOfLines={1} style={styles.albumArtist}>{item.artistName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subTitle}>Recommended Songs</Text>

      {/* 🔹 Lista vertical de canciones */}
      {randomSongs.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.songRow}
          onPress={() => playSong(item, randomSongs)}
        >
          <Image
            source={{ uri: fixWebUrl(item.cover) }}
            style={styles.songCover}
          />
          <View style={styles.textContainer}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songArtist}>{item.artistName}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Espacio para no chocar con MiniPlayer */}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 25,
  },

  /* 🔹 Álbumes */
  albumGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  albumRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 10,
    width: "48%",
    marginBottom: 12,
    gap: 10,
  },

  albumCover: { width: 55, height: 55, borderRadius: 8 },

  albumName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  albumArtist: {
    color: "#aaa",
    fontSize: 13,
  },

  /* 🔹 Canciones */
  subTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginTop: 20,
  },

  songRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    gap: 12,
  },

  songCover: { width: 55, height: 55, borderRadius: 6 },

  textContainer: { flex: 1 },
  songTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
  songArtist: { color: "#aaa", fontSize: 14 },
});
