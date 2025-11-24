import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeScreen from "../screens/homeScreen";
import SongScreen from "../screens/songScreen";
import AlbumScreen from "../screens/albumScreen";
import PlaylistScreen from "../screens/playlistScreen";

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState("Home");

  const renderScreen = () => {
    if (currentScreen === "Home") return <HomeScreen key="home" />;
    if (currentScreen === "Song") return <SongScreen key="song" />;
    if (currentScreen === "Album") return <AlbumScreen key="album" />;
    if (currentScreen === "Playlist") return <PlaylistScreen key="playlist" />;
    return <HomeScreen key="home-default" />;
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#222" }}>
      
      {/* HEADER FIJO */}
      <View style={styles.header}>
        <NavButton title="Home" onPress={() => setCurrentScreen("Home")} />
        <NavButton title="Songs" onPress={() => setCurrentScreen("Song")} />
        <NavButton title="Albums" onPress={() => setCurrentScreen("Album")} />
        <NavButton title="Playlist" onPress={() => setCurrentScreen("Playlist")} />
      </View>

      {/* CONTENIDO */}
      <View style={{ flex: 1, backgroundColor: "#111" }}>
        {renderScreen()}
      </View>


    </SafeAreaView>
  );
}

function NavButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.navButton}>
      <Text style={{ color: "white", fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#222",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
