import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/homeScreen";
import ArtistScreen from "../screens/artistScreen";
import AlbumScreen from "../screens/albumScreen";
import PlayerScreen from "../screens/playerScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    /*
  return (
    <NavigationContainer>
      <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Artist" component={ArtistScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
  */
}
