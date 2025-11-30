import React, { createContext, useState, useRef,useEffect } from "react";
import { Audio } from "expo-av";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(1);
  const queueRef = useRef([]);
  const queueIndexRef = useRef(0);

  const [volume, setVolumeState] = useState(0.5);
  const MAX_VOLUME = 0.5;

  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);

  const soundRef = useRef(null);

  const fixWebUrl = (url) => url?.split(" ").join("%20");

  const getAudioSource = (song) => ({ uri: fixWebUrl(song.url) });

  const setVolume = async (value) => {
    const finalVolume = Math.min(value, MAX_VOLUME);
    setVolumeState(finalVolume);
    if (soundRef.current) {
      await soundRef.current.setStatusAsync({ volume: finalVolume });
    }
  };

  async function playSong(song, fullQueue = null) {
    if (!song) return;

    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      if (fullQueue) {
        queueRef.current = fullQueue;
        setQueue(fullQueue);

        const idx = fullQueue.findIndex((s) => s.id === song.id);
        const finalIndex = idx >= 0 ? idx : 0;

        queueIndexRef.current = finalIndex;
        setQueueIndex(finalIndex);
      }

      const { sound } = await Audio.Sound.createAsync(
        getAudioSource(song),
        { shouldPlay: true, volume }
      );

      soundRef.current = sound;
      setCurrentSong({ ...song, cover: fixWebUrl(song.cover) });
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status?.isLoaded) {
          setPositionMillis(status.positionMillis || 0);
          setDurationMillis(status.durationMillis || 1);
        }
        if (status?.didJustFinish) {
          playNext();
        }
      });

    } catch (err) {
      console.error("[Player] error in playSong:", err);
    }
  }


  function playNext() {
    const q = queueRef.current;
    const idx = queueIndexRef.current;

    if (idx + 1 >= q.length) {
      setIsPlaying(false);
      return;
    }

    const nextIndex = idx + 1;

    queueIndexRef.current = nextIndex;
    setQueueIndex(nextIndex);

    playSong(q[nextIndex]);
  }

  async function togglePlayPause() {
    if (!soundRef.current) return;

    if (isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  }

  async function seekToPosition(millis) {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(millis);
      setPositionMillis(millis);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        queue,
        queueIndex,
        playSong,
        playNext,
        togglePlayPause,
        positionMillis,
        durationMillis,
        seekToPosition,
        volume,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
