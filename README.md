# 🎵 **SPunktify**
A mobile application inspired by Spotify, built with **React Native + Expo**.

This repository contains everything you need to run the app locally.

---

## 📱 **Preview**
<p align="center">
  <img src="./assets/imghome.png" width="230"/>
  <img src="./assets/imgSongs.png" width="230"/>
  <img src="./assets/imgAlbums.png" width="230"/>
  <img src="./assets/imgAlbum.png" width="230"/>
  <img src="./assets/imgPlaylists.png" width="230"/>
  <img src="./assets/imgPlaylist.png" width="230"/>
</p>

---

## 🚀 **Installation**

### 1️⃣ Install Dependencies

```bash
├── @react-native-async-storage/async-storage@2.2.0
├── @react-native-community/slider@5.1.1
├── @react-navigation/native-stack@7.6.4
├── @react-navigation/native@7.1.21
├── add@2.0.6
├── AsyncStorage@0.1.5
├── concurrently@9.2.1
├── cors@2.8.5
├── expo-av@16.0.7
├── expo-status-bar@3.0.8
├── expo@54.0.25
├── express@5.1.0
├── react-dom@19.1.0
├── react-native-safe-area-context@5.6.2
├── react-native-screens@4.18.0
├── react-native-web@0.21.2
├── react-native@0.81.5
└── react@19.1.0
```

2. The music its located on an external server on supabase.com, before this change it was 100% local so you dont have to do anything on this step

3.  run generate script that is located in /data/generate.js
    Terminal:
        SPunktify> cd data
        SPunktify/data> node generate.js
        [LOG] Listo! JSONs generados ✔   (JSONs generated)
    

4.  Start Expo GO
    Terminal:
            SPunktify> npx expo start

For now, I think its everything you need to do for you to run SPunktify locally. Thanks.

