// src/components/MiniPlayer.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { PlayerContext } from "../context/playerContext";

export default function MiniPlayer() {
  const { currentSong, isPlaying, togglePlayPause } = useContext(PlayerContext);


  if (!currentSong) return null;


  const coverUri = currentSong?.cover || currentSong?.albumCover;
  const title = currentSong?.title || "Sin título";
  const artist = currentSong?.artistName || (currentSong?.artistIds ? currentSong.artistIds.join(", ") : "");

  return (
    <View style={styles.container}>
      <Image source={{ uri: coverUri }} style={styles.cover} />

      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        <Text numberOfLines={1} style={styles.artist}>{artist}</Text>
      </View>

      <TouchableOpacity onPress={togglePlayPause} style={styles.button}>
        <Text style={{ fontSize: 20, color: "white" }}>
          {isPlaying ? "⏸" : "▶️"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#222",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopColor: "#333",
    borderTopWidth: 1,
  },
  cover: { width: 45, height: 45, borderRadius: 5, marginRight: 10 },
  title: { color: "white", fontSize: 16, fontWeight: "bold" },
  artist: { color: "#bbb", fontSize: 14 },
  button: { paddingHorizontal: 10 },
});
