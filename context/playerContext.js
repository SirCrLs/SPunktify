import React, { createContext, useState, useRef } from "react";
import { Audio } from "expo-av";
import { Platform } from "react-native";
import { Asset } from "expo-asset";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(1);
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

  if (song.urlMobile) {
    return { uri: fixWebUrl(song.urlMobile) };
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
      song.cover = fixWebUrl(song.cover) ;
      setCurrentSong(song);
      setIsPlaying(true);

      // handle song ending and update progress
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status?.isLoaded) {
          setPositionMillis(status.positionMillis || 0);
          setDurationMillis(status.durationMillis || 1);
        }
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

  async function seekToPosition(millis) {
    if (soundRef.current && typeof soundRef.current.setPositionAsync === "function") {
      try {
        await soundRef.current.setPositionAsync(millis);
        setPositionMillis(millis);
      } catch (err) {
        console.error("[Player] seekToPosition error:", err);
      }
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        togglePlayPause,
        positionMillis,
        durationMillis,
        seekToPosition,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
