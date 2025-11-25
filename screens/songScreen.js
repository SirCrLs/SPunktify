import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { PlayerContext } from "../context/playerContext";
import { sortByTitle, sortByArtist } from "../utils/songSorter";
import AddToPlaylistModal from "../components/addToPlaylistModal";
import { PlaylistContext } from "../context/playlistContext";

function fixWebUrl(url) {
    if (!url) return url;
    return url.split(" ").join("%20");
  }

export default function SongScreen() {
  const [songs, setSongs] = useState([]);
  const [sortMode, setSortMode] = useState("artist"); // title | artist
  const [reverse, setReverse] = useState(false); // asc | desc
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [songToAdd, setSongToAdd] = useState(null);
  const { playlists, addSongToPlaylists, createPlaylist } = useContext(PlaylistContext);


  const { playSong } = useContext(PlayerContext);
  const songsJSON = require("../data/songs.json");

  function openAddToPlaylist(song) {
    setSongToAdd(song);
    setAddModalVisible(true);
  }

  function handleAddToPlaylist(playlistIds) {
    addSongToPlaylists(songToAdd.id, playlistIds);
  }

  useEffect(() => {
    applySorting();
  }, [sortMode, reverse]);

  function applySorting() {
    let sorted = songsJSON;

    if (sortMode === "title") {
      sorted = sortByTitle(songsJSON, reverse);
    } else if (sortMode === "artist") {
      sorted = sortByArtist(songsJSON, reverse);
    }

    setSongs(sorted);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>All Songs</Text>

        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              setSortMode((prev) => (prev === "title" ? "artist" : "title"))
            }
          >
            <Text style={styles.buttonText}>
              {sortMode === "title" ? "Song" : "Artist"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setReverse((prev) => !prev)}
          >
            <Text style={styles.buttonText}>
              {reverse ? "Desc" : "Asc"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* Song List */}
      <View style={styles.listContainer}>
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.songItem}
              onPress={() => playSong(item,songs)}
            >
              <Image 
                source={{ uri: fixWebUrl(item.cover) }} 
                style={styles.cover} 
              />

              <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.songTitle}>
                  {item.title}
                </Text>
                <Text numberOfLines={1} style={styles.songArtist}>
                  {item.artistName}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => openAddToPlaylist(item)}
              >
                <Text style={{ color: "white", fontSize: 18 }}>＋</Text>
              </TouchableOpacity>

            </TouchableOpacity>
          )}
        />
      </View>
      <AddToPlaylistModal
        visible={addModalVisible}
        playlists={playlists}
        onClose={() => setAddModalVisible(false)}
        onAdd={handleAddToPlaylist}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 25, 
    backgroundColor: "#111",
  },

  title: { 
    color: "white", 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 15 
  },

  songItem: {
    flexDirection: "row",   
    alignItems: "center",    
    gap: 12,                  
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    bottom : 0,
  },

  cover: { 
    width: 55, 
    height: 55, 
    borderRadius: 6 
  },

  textContainer: {
    flex: 1,
    justifyContent: "center"
  },

  songTitle: { 
    color: "white", 
    fontSize: 17, 
    fontWeight: "600" 
  },

  songArtist: { 
    color: "#aaa", 
    marginTop: 2,
    fontSize: 14 
  },
  listContainer: {
    flex: 1,
    paddingBottom: 40,   
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "right",
    marginBottom: 10,
    paddingHorizontal: 5,
    gap: 20,
  },

headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 5,
},

headerButtons: {
  flexDirection: "row",
  gap: 10,
},

button: {
  backgroundColor: "#333",
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 6,
},

buttonText: {
  color: "white",
  fontSize: 14,
},


  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  cover: { width: 50, height: 50, borderRadius: 6 },

  textContainer: { marginLeft: 12, flex: 1 },

  songTitle: { color: "white", fontSize: 18 },

  songArtist: { color: "#aaa", fontSize: 14 },
  addBtn: {
    flexDirection: "row",
    paddingHorizontal: 15,
  },
});
