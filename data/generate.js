const fs = require("fs");
const path = require("path");

const basePath = "../music";

let artists = [];
let albums = [];
let songs = [];
let queue = [];

let artistId = 1;
let albumId = 1;
let songId = 1;

function walk() {
  const artistFolders = fs.readdirSync(basePath);

  artistFolders.forEach(artistFolder => {
    const artistPath = path.join(basePath, artistFolder);

    if (!fs.statSync(artistPath).isDirectory()) return;

    const newArtist = {
      id: String(artistId++),
      name: artistFolder
    };

    artists.push(newArtist);

    const albumFolders = fs.readdirSync(artistPath);

    albumFolders.forEach(albumFolder => {
      const albumPath = path.join(artistPath, albumFolder);

      if (!fs.statSync(albumPath).isDirectory()) return;

      const newAlbum = {
        id: String(albumId++),
        name: albumFolder,
        artistIds: [newArtist.id],
        cover: `${albumPath}/cover.png`

      };
      albums.push(newAlbum);

      const songFiles = fs.readdirSync(albumPath);

      songFiles.forEach(file => {
        if (!file.endsWith(".mp3") && !file.endsWith(".m4a")) return;

        const songUrl = `${albumPath}/${file}`; 

        const newSong = {
          id: String(songId++),
          title: file.replace(/\.(mp3|m4a)$/i, ""),
          artistIds: [newArtist.id],
          albumId: newAlbum.id,
          url: songUrl
        };

        songs.push(newSong);
        queue.push(newSong); // 👈 SE GUARDA EN EL ORDEN CORRECTO
      });
    });
  });
}

walk();

fs.writeFileSync("artists.json", JSON.stringify(artists, null, 2));
fs.writeFileSync("albums.json", JSON.stringify(albums, null, 2));
fs.writeFileSync("songs.json", JSON.stringify(songs, null, 2));
fs.writeFileSync("queue.json", JSON.stringify(queue, null, 2));

console.log("Listo! JSONs generados ✔");
