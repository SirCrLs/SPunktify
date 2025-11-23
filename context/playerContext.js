import React, { createContext, useState, useRef } from "react";
import { Audio } from "expo-av";
import { Platform } from "react-native";
import { Asset } from "expo-asset";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  // Encode spaces in web URLs
  function fixWebUrl(url) {
    if (!url) return url;
    return url.split(" ").join("%20");
  }

  function getAudioSource(song) {
  if (Platform.OS === "web") {
    return { uri: fixWebUrl(song.url) };
  }

  // Móvil → usar el archivo copiado dentro del bundle de assets
  if (song.urlMobile) {
    return { uri: song.urlMobile };
  }

  return { uri: fixWebUrl(song.url) };
}


  async function playSong(song) {
    if (!song) return;

    try {
      // unload previous audio
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // get correct audio source
      const source = getAudioSource(song);

      const { sound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: true }
      );

      soundRef.current = sound;
      setCurrentSong(song);
      setIsPlaying(true);

      // handle song ending
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status?.didJustFinish) {
          setIsPlaying(false);
        }
      });

    } catch (err) {
      console.error("[Player] error in playSong:", err);
      setIsPlaying(false);
    }
  }

  async function togglePlayPause() {
    if (!soundRef.current) return;

    try {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("[Player] togglePlayPause error:", err);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        togglePlayPause,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
