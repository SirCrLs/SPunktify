import { Audio } from "expo-av";
import { createContext, useState } from "react";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [sound, setSound] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  async function playSong(song) {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: song.url }
    );
    setSound(newSound);
    setCurrentSong(song);
    await newSound.playAsync();
  }

  return (
    <PlayerContext.Provider value={{ currentSong, playSong }}>
      {children}
    </PlayerContext.Provider>
  );
}
