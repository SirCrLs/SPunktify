import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { PlayerContext } from "../context/playerContext";


if (typeof global.self === "undefined") global.self = global;
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
global.fetch = global.fetch;

export default function SongScreen() {
  const [songs, setSongs] = useState([]);
  const { playSong } = useContext(PlayerContext);

  useEffect(() => {
    async function loadSongs() {
      try {
        const url = "http://192.168.100.142:8080/data/songs.json";

        console.log("FETCHING:", url);

        const response = await fetch(url);
        const json = await response.json();

        try {
          setSongs(json);
        } catch (err) {
          console.log("JSON inválido:", text.substring(0, 200));
          return;
        }

      } catch (err) {
        console.log("Error loading songs.json:", err);
      }
    }

    loadSongs();
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
