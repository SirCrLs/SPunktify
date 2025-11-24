import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/appNavigator";
import { PlayerProvider } from "./context/playerContext";
import MiniPlayer from "./components/miniPlayer";
import { PlaylistProvider } from "./context/playlistContext";


export default function App() {
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
