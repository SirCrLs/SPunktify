import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PlayerProvider } from "../context/playerContext";
import MiniPlayer from "../components/miniPlayer";

import HomeScreen from "../screens/homeScreen";
import ArtistScreen from "../screens/artistScreen";
import AlbumScreen from "../screens/albumScreen";
import PlayerScreen from "../screens/playerScreen";

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState("Home");

  const renderScreen = () => {
    if (currentScreen === "Home") return <HomeScreen />;
    if (currentScreen === "Artist") return <ArtistScreen />;
    if (currentScreen === "Album") return <AlbumScreen />;
    if (currentScreen === "Player") return <PlayerScreen />;
    return <HomeScreen />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#222" }}>
      
      {/* HEADER FIJO */}
      <View style={styles.header}>
        <NavButton title="Home" onPress={() => setCurrentScreen("Home")} />
        <NavButton title="Artistas" onPress={() => setCurrentScreen("Artist")} />
        <NavButton title="Álbumes" onPress={() => setCurrentScreen("Album")} />
        <NavButton title="Player" onPress={() => setCurrentScreen("Player")} />
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
