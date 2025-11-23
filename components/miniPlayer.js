import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import { PlayerContext } from "../context/playerContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MiniPlayer() {
	const { currentSong, isPlaying, togglePlayPause } = useContext(PlayerContext);
	if (!currentSong) return null;


	return (
        <SafeAreaView edges={["bottom"]} style={styles.footer}>
			<View style={styles.footer}>
				<View style={styles.container}>
					<Image source={currentSong.cover} style={styles.cover} />
					<View style={{ flex: 1 }}>
						<Text numberOfLines={1} style={styles.title}>{currentSong.title || "Sin título"}</Text>
						<Text numberOfLines={1} style={styles.artist}>{currentSong.artistName || ""}</Text>
					</View>
					<TouchableOpacity onPress={togglePlayPause} style={styles.button}>
						<Text style={{ fontSize: 20, color: "white" }}>{isPlaying ? "⏸" : "▶️"}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: !(Platform.OS === "web") ? 20 : 0,
        backgroundColor: "#222",
        borderTopColor: "#333",
        borderTopWidth: 1,
        zIndex: 100,
    },
    container: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    cover: { width: 45, height: 45, borderRadius: 5, marginRight: 10 },
    title: { color: "white", fontSize: 16, fontWeight: "bold" },
    artist: { color: "#bbb", fontSize: 14 },
    button: { paddingHorizontal: 10 },
});
