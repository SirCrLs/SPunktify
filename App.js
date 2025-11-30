import { useEffect } from "react";
import { Audio } from "expo-av";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./navigation/appNavigator";
import { PlayerProvider } from "./context/playerContext";
import MiniPlayer from "./components/miniPlayer";
import { PlaylistProvider } from "./context/playlistContext";

export default function App() {

  useEffect(() => {
    async function enableBackgroundAudio() {
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: false
        });
      } catch (error) {
        console.log("Error setting background audio mode:", error);
      }
    }

    enableBackgroundAudio();
  }, []);

  return (
    <SafeAreaProvider>
      <PlaylistProvider>
        <PlayerProvider>
          <AppNavigator />
          <MiniPlayer />
        </PlayerProvider>
      </PlaylistProvider>
    </SafeAreaProvider>
  );
}
