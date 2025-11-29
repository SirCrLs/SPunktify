import React, { useState, useContext } from "react";
import { ScrollView, Image } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList
} from "react-native";
import songsJSON from "../data/songs.json";
import { PlayerContext } from "../context/playerContext";
import { PlaylistContext } from "../context/playlistContext";

function fixWebUrl(url) {
  if (!url) return url;
  return url.split(" ").join("%20");
}

export default function PlaylistScreen() {
  const { playlists,createPlaylist, deletePlaylist } = useContext(PlaylistContext);
  const { playSong } = useContext(PlayerContext);

  const [creating, setCreating] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  function handleCreate() {
    if (!playlistName.trim()) return;
    createPlaylist(playlistName.trim());
    setPlaylistName("");
    setCreating(false);
  }

  if (selectedPlaylist) {
    const playlistSongs = selectedPlaylist.songs.map(id =>
      songsJSON.find(s => s.id === id)
    );

    return (
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.detailHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedPlaylist(null)}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          {/* DELETE BUTTON */}
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => {
              deletePlaylist(selectedPlaylist.id);
              setSelectedPlaylist(null);
            }}
          >
            <Text style={styles.deleteBtnText}>🗑</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{selectedPlaylist.name}</Text>

        <ScrollView style={{ marginTop: 10 }} contentContainerStyle={{ paddingBottom: 120 }}>
          {playlistSongs.length === 0 ? (
            <Text style={{ color: "#aaa", marginTop: 20 }}>
              No songs yet. Add some from All Songs.
            </Text>
          ) : (
            playlistSongs.map(song => (
              <TouchableOpacity
                key={song.id}
                style={styles.songItem}
                onPress={() => playSong(song, playlistSongs)}
              >
                <View style={styles.songRow}>
                  <Image 
                    source={{ uri: fixWebUrl(song.cover) }} 
                    style={styles.cover} 
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.songTitle}>{song.title}</Text>
                    <Text style={styles.songArtist}>{song.artistName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playlists</Text>

      {creating ? (
        <View style={styles.createBox}>
          <TextInput
            style={styles.input}
            placeholder="Playlist name..."
            placeholderTextColor="#777"
            value={playlistName}
            onChangeText={setPlaylistName}
          />

          <View style={styles.row}>
            <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
              <Text style={styles.createBtnText}>Create</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setCreating(false)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setCreating(true)}
        >
          <Text style={styles.addButtonText}>+ New Playlist</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={playlists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.playlistRow}>

            <TouchableOpacity
              style={styles.playlistItem}
              onPress={() => setSelectedPlaylist(item)}
            >
              <Text style={styles.playlistName}>{item.name}</Text>
              <Text style={styles.playlistCount}>{item.songs.length} songs</Text>
            </TouchableOpacity>

            {/* DELETE BUTTON */}
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deletePlaylist(item.id)}
            >
              <Text style={styles.deleteBtnText}>🗑</Text>
            </TouchableOpacity>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  title: { color: "white", fontSize: 26, fontWeight: "bold", marginBottom: 20 },

  playlistRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  deleteBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  deleteBtnText: {
    color: "#ff4d4d",
    fontSize: 24,
  },

  playlistItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    flex: 1
  },
  playlistName: { color: "white", fontSize: 18 },
  playlistCount: { color: "#aaa", fontSize: 14 },

  createBox: { marginBottom: 15 },
  input: {
    backgroundColor: "#222",
    color: "white",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10
  },
  row: { flexDirection: "row", gap: 12 },
  createBtn: {
    backgroundColor: "#1db954",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6
  },
  createBtnText: { color: "white", fontSize: 16, fontWeight: "bold" },
  cancelBtn: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6
  },
  cancelBtnText: { color: "white", fontSize: 16 },

  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: { paddingVertical: 5 },
  backText: { color: "white", fontSize: 20 },

  songRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  cover: {
    width: 55,
    height: 55,
    borderRadius: 6,
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },

  songTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },

  songArtist: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 2,
  },
  addButton: {
  backgroundColor: "#1db954",
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 6,
  marginBottom: 10,
  alignSelf: "flex-start"
},

createBtn: {
  backgroundColor: "#1db954",
  paddingVertical: 8,
  paddingHorizontal: 15,
  borderRadius: 6,
},
});
