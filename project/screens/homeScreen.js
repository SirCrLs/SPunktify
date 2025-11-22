import { View, Text, Button } from "react-native";
import { PlayerContext } from "../context/playerContext";

export default function HomeScreen({ navigation }) {

  const pruebaSong = {
    id: "1",
    title: "Canción de prueba",
    url: "/music/Panic! at the Disco/A Fever You Cant Sweat Out/09- But its Better If You Do.m4a",
    artistName: "Artista X",
    cover: "/music/Panic! at the Disco/A Fever You Cant Sweat Out/cover.png"
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Text>Home</Text>

      <Button title="Reproducir canción de prueba"
        onPress={() => playSong(pruebaSong)}
      />
    </View>
  );
}