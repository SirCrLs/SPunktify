import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/appNavigator";
import { PlayerProvider } from "./context/playerContext";
import MiniPlayer from "./components/miniPlayer";


export default function App() {
  return (
    <SafeAreaProvider>
      <PlayerProvider>
        <AppNavigator />
        <MiniPlayer />
      </PlayerProvider>
    </SafeAreaProvider>
  );
}
