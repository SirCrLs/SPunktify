import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View, Text } from "react-native";

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync(); // evita que se oculte el splash screen de forma predeterminada
    setTimeout(() => {
      SplashScreen.hideAsync(); // oculta después de 2s
    }, 10000);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Aqui puedes agregar un componente de React (puedes crear un componente separado o mover el codigo creado en clase anterior e importarlo en la sección de arriba) </Text>
    </View>
  );
}
