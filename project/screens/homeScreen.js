import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ marginTop: 50 }}>
      <Text>Home</Text>

      <Button 
        title="Ir a Artista"
        onPress={() => navigation.navigate("Artist")}
      />
    </View>
  );
}