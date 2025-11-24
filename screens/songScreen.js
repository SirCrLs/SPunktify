import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { PlayerContext } from "../context/playerContext";


export default function SongScreen() {
  const [songs, setSongs] = useState([]);
  const { playSong } = useContext(PlayerContext);

    const songsJSON = require("../data/songs.json");

    useEffect(() => {
    setSongs(songsJSON);
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas las Canciones</Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songItem}
            onPress={() => playSong(item)}
          >
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songArtist}>{item.artistName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#111" },
  title: { color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  songItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  songTitle: { color: "white", fontSize: 18 },
  songArtist: { color: "#aaa", fontSize: 14 },
});
