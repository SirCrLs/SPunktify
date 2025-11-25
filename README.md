# SPunktify
a mobile app similar to spotify
This is a step by step guide to make it work locally

1. install this dependencies:
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

2. The music you will use its in /public/Music/{Artist}/{Album}/{SongNumber}- {SongTitle}.m4a
    if you want to add music for you to play you must respect this location and the sintax of the m4a file
        Example:
                └── SPunktify
                    └── public
                        └── music
                            ├── Asking Alexandria
                            └── Bring Me The Horizon
                                └── Count Your Blessings
                                    ├── 01- Pray For Plagues.m4a
                                    ├── 02- Tell Slater not to Wash his D**k.m4a
                                    └── cover.png  <----  (Album cover)

    This will be necessary for when we run the generate.js script that saves every song, album and artist
    automatically in a Json

3.  run generate script that is located in /data/generate.js
    even though the jsons are already there, the most important thing that it does is that saves your local IP in the
    url of every song / album cover, we will need that when we set up the local server
    Terminal:
        SPunktify> cd data
        SPunktify/data> node generate.js
        [LOG] Listo! JSONs generados ✔   (JSONs generated)
    
4.  Setup local server
    Our local server will always be located on http://localhost:8080 (you can change that if you want)
    Terminal
        SPunktify> node server.js
        [LOG] Servidor local corriendo en: http://localhost:8080    (local server running in http://localhost:8080)

    This step is extremely important if you want to run SPunktify in Expo GO

5.  Start Expo GO
    Once you setuped the local server, now you can enter SPunktify app and play downloaded songs on /public/music
    on web or expo go
    Terminal:
            SPunktify> npx expo start

For now, I think its everything you need to do for you to run SPunktify locally. Thanks.

