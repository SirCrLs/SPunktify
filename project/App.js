import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/appNavigator";
import { PlayerProvider } from "./context/playerContext";


export default function App() {
  return (
    <SafeAreaProvider>
      <PlayerProvider>
        <AppNavigator />
      </PlayerProvider>
    </SafeAreaProvider>
  );
}
