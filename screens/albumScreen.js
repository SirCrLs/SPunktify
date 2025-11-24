import React, { useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Platform, ScrollView } from "react-native";
import songsJSON from "../data/songs.json";
import albumsJSON from "../data/albums.json";
import { PlayerContext } from "../context/playerContext";

function fixWebUrl(url) {
  return url?.split(" ").join("%20");
}

export default function AlbumScreen() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const { playSong } = useContext(PlayerContext);

  if (selectedAlbum) {
    const albumSongs = songsJSON.filter(s => s.albumId === selectedAlbum.id);

    return (
      <View style={{ flex: 1, backgroundColor: "#111" }}>

        {/* 🟩 MINI-HEADER FIJO */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedAlbum(null)}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.headerTitle}>
            {selectedAlbum.name}
          </Text>
          <View style={{ width: 40 }} /> 
        </View>

        {/* CONTENIDO SCROLLEABLE */}
        <ScrollView style={styles.detailContainer} contentContainerStyle={{ paddingBottom: 80 }}>

          {/* COVER GRANDE */}
          <Image
            source={{ uri: fixWebUrl(selectedAlbum.cover) }}
            style={styles.bigCover}
          />

          {/* NOMBRE DEL ÁLBUM */}
          <Text style={styles.albumName}>{selectedAlbum.name}</Text>
          <Text style={styles.artistName}>{selectedAlbum.artistName}</Text>

          {/* LISTA DE CANCIONES */}
          <View style={styles.songList}>
            {albumSongs.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.songItem}
                onPress={() => playSong(item, albumSongs)}
              >
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.songArtist}>{item.artistName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  const numCols = Platform.OS === "web" ? 4 : 2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Albums</Text>

      <FlatList
        data={albumsJSON}
        numColumns={numCols}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.albumCard, numCols === 2 ? styles.mobileCard : styles.webCard]}
            onPress={() => setSelectedAlbum(item)}
          >
            <Image
              source={{ uri: fixWebUrl(item.cover) }}
              style={styles.albumCover}
            />
            <Text numberOfLines={1} style={styles.albumTitle}>{item.name}</Text>
            <Text numberOfLines={1} style={styles.artistName}>{item.artistName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  /* GENERAL */
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },


  header: {
    height: 55,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 20,
  },

  backText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "center",
  },

  detailContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  /* GRID */
  columnWrapper: {
    justifyContent: "space-between",
  },

  albumCard: {
    marginBottom: 25,
    alignItems: "center",
  },

  webCard: {
    width: "23%",
  },

  mobileCard: {
    width: "48%",
  },

  albumCover: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 6,
  },

  albumTitle: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },

  /* DETALLE DEL ALBUM */
  bigCover: {
    width: Platform.OS === "web" ? "25%" : "100%",
    aspectRatio: 1,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
  },

  albumName: {
    color: "white",
    fontSize: 26,
    marginTop: 15,
    fontWeight: "bold",
    textAlign: "center",
  },

  artistName: {
    color: "#ccc",
    fontSize: 18,
    marginTop: 5,
    textAlign: "center",
  },

  /* CANCIONES */
  songList: {
    marginTop: 25,
  },

  songItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  songTitle: { color: "white", fontSize: 18 },
  songArtist: { color: "#aaa", fontSize: 14 },

  /* TÍTULO PÁGINA */
  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
