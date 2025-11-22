import { useEffect, useState, useContext } from "react";
import { View, Text, Button } from "react-native";
import { PlayerContext } from "../context/playerContext";

export default function HomeScreen() {
  const { playSong } = useContext(PlayerContext);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/data/songs.json")
      .then(res => res.json())
      .then(data => {
        console.log("Canciones cargadas:", data.length);
        setSongs(data);
      })
      .catch(err => console.error("Error cargando songs.json:", err));
  }, []);

  if (songs.length === 0) {
    return (
      <View style={{ marginTop: 60 }}>
        <Text style={{ color: "white" }}>Cargando canciones...</Text>
      </View>
    );
  }

  // Tomamos la PRIMER canción del JSON
  const firstSong = songs[1];

  return (
    <View style={{ marginTop: 60 }}>
      <Text style={{ color: "white", fontSize: 20 }}>
        Home - Canción de prueba
      </Text>

      <Button
        title={`Reproducir: ${firstSong.title}`}
        onPress={() => playSong(firstSong)}
      />
    </View>
  );
}
