import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, Pressable } from "react-native";
import { PlayerContext } from "../context/playerContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from '@react-native-community/slider';


export default function MiniPlayer() {
	const [barWidth, setBarWidth] = useState(0);
    const { currentSong, isPlaying, togglePlayPause, positionMillis = 0, durationMillis = 1,playNext, seekToPosition, volume, setVolume} = useContext(PlayerContext);
    if (!currentSong) return null;

    const coverSource = { uri: currentSong.cover };
    const progress = durationMillis > 0 ? positionMillis / durationMillis : 0;

    const handleSeek = (evt) => {
        if (!durationMillis || !seekToPosition || !barWidth || durationMillis <= 0) return;
        let percent = 0;
        if (Platform.OS === "web") {
            const rect = evt.target.getBoundingClientRect();
            const x = evt.nativeEvent.clientX - rect.left;
            percent = Math.max(0, Math.min(1, x / rect.width));
        } else {
            const { locationX } = evt.nativeEvent;
            percent = Math.max(0, Math.min(1, locationX / barWidth));
        }
        const seekTo = percent * durationMillis;
        if (isFinite(seekTo) && seekTo >= 0 && seekTo <= durationMillis) {
            seekToPosition(seekTo);
        }
    };

    return (
        <SafeAreaView edges={["bottom"]} style={styles.footer}>
            <View style={styles.footer}>
                <View style={styles.container}>
                    <Image source={coverSource} style={styles.cover} />
                    <View style={{flex: 1}}>
                        <Text numberOfLines={1} style={styles.title}>{currentSong.title || "Sin título"}</Text>
                        <Text numberOfLines={1} style={styles.artist}>{currentSong.artistName || ""}</Text>
                    </View>
					<View style={styles.controls}>
                        {Platform.OS === "web" && (
                            <Slider
                                style={styles.volumeSlider}
                                minimumValue={0}
                                maximumValue={0.5}
                                value={volume}
                                onValueChange={(v) => setVolume(v)}
                                minimumTrackTintColor="#1db954"
                                maximumTrackTintColor="#444"
                                thumbTintColor="#fff"
                            />
                        )}

                        <TouchableOpacity onPress={togglePlayPause} style={styles.button}>
                            <Text style={{ fontSize: 25, color: "white" }}>
                                {isPlaying ? "⏸" : "▶"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={playNext} style={styles.button}>
                            <Text style={{ fontSize: 22, color: "white" }}>⏭️</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                {/* Progress Bar with seek */}
                <Pressable onPress={handleSeek}>
                    <View
                        style={styles.progressBarContainer}
                        onLayout={e => setBarWidth(e.nativeEvent.layout.width)}
                    >
                        <View style={[styles.progressBar, { width: `${Math.round(progress * 100)}%` }]} />
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: !(Platform.OS === "web") ? 25 : 0,
        backgroundColor: "#222",
        borderTopColor: "#333",
        borderTopWidth: 1,
        zIndex: 100,
        elevation: 10, 
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
    button: { paddingHorizontal: 10 , marginLeft: 5},
    progressBarContainer: {
        height: 8,
        width: "100%",
        backgroundColor: "#444",
        borderRadius: 8,
        overflow: "hidden",
        marginTop: 2,
    },
    progressBar: {
        height: 8,
        backgroundColor: "#1db954",
        borderRadius: 8,
    },
	controls: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
        justifyContent: "flex-end",
	},
	volumeSlider: {
		width: 100,  // ajusta según el espacio que quieras
		height: 40,
		marginLeft: 10,
	},
});
