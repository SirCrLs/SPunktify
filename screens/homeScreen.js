import { useEffect, useState, useContext } from "react";
import { View, Text, Button, Platform } from "react-native";
import { PlayerContext } from "../context/playerContext";

export default function HomeScreen() {


	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 60 }}>
			<Text style={{ color: "white", fontSize: 20 }}>Home - Canción de prueba</Text>
		</View>
	);
}
