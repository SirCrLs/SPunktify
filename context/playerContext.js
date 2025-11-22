// src/context/PlayerContext.js
import React, { createContext, useState, useRef } from "react";
import { Audio } from "expo-av";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  async function playSong(song) {
    if (!song) {
      console.warn("[Player] playSong called with falsy song:", song);
      return;
    }

    try {
      // unload previous
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // create and play
      const { sound } = await Audio.Sound.createAsync(
        { uri: song.url },
        { shouldPlay: true }
      );

      soundRef.current = sound;
      setCurrentSong(song);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status) return;
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });

    } catch (err) {
      console.error("[Player] error in playSong:", err);
      setIsPlaying(false);
    }
  }

  async function togglePlayPause() {
    if (!soundRef.current) {
      console.warn("[Player] togglePlayPause called but no sound loaded");
      return;
    }

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
    <PlayerContext.Provider value={{
      currentSong,
      isPlaying,
      playSong,
      togglePlayPause,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}
