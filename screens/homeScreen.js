import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { PlayerContext } from "../context/playerContext";

export default function HomeScreen() {
  const { playSong } = useContext(PlayerContext);

  const testSong = {
    id: "82",
    title: "LosT",
    artistIds: "3",
    artistName: "Bring Me The Horizon",
    albumId: "7",
    numberInAlbum: 10,
    cover: "/music/Bring Me The Horizon/Post Human NeX GEn/cover.png",
    coverMobile: "/assets/music/Bring Me The Horizon/Post Human NeX GEn/cover.png",
    url: "/music/Bring Me The Horizon/Post Human NeX GEn/10- LosT.m4a",
    urlMobile: "/assets/music/Bring Me The Horizon/Post Human NeX GEn/10- LosT.m4a"
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
        Home Screen
      </Text>

      <Button
        title="▶️ Reprobar 'LosT'"
        onPress={() => playSong(testSong)}
      />
    </View>
  );
}
