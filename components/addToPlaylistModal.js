import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput
} from "react-native";

export default function AddToPlaylistModal({
  visible,
  playlists,
  onClose,
  onAdd,
}) {
  const [selected, setSelected] = useState([]);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");

  function toggleSelect(id) {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  function finishAdd() {
    onAdd(selected);
    setSelected([]);
    onClose();
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Add to playlist</Text>

          {/* Playlists */}
          <ScrollView style={{ maxHeight: 200 }}>
            {playlists.map(pl => (
              <TouchableOpacity
                key={pl.id}
                onPress={() => toggleSelect(pl.id)}
                style={[
                  styles.playlistItem,
                  selected.includes(pl.id) && styles.playlistSelected
                ]}
              >
                <Text style={styles.playlistText}>{pl.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Confirmar */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.addBtnFinal} onPress={finishAdd}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center"
  },

  box: {
    backgroundColor: "#222",
    width: "80%",
    padding: 20,
    borderRadius: 12
  },

  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "bold"
  },

  playlistItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333"
  },

  playlistSelected: {
    backgroundColor: "#1db95466"
  },

  playlistText: {
    color: "white",
    fontSize: 16
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },

  addBtnFinal: {
    backgroundColor: "#1db954",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 6
  },

  addText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },

  cancel: {
    color: "#ccc",
    fontSize: 16
  },

  input: {
    backgroundColor: "#333",
    color: "white",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10
  },

  createBtn: {
    backgroundColor: "#1db954",
    padding: 10,
    borderRadius: 6,
    marginBottom: 5
  },

  createBtnText: { color: "white", fontSize: 16 },

  newBtn: {
    marginBottom: 15
  }
});
