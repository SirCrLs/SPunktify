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

function cleanSongName(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

  const parts = nameWithoutExt.split("-");

  if (parts.length > 1) {
    return parts.slice(1).join("-").trim(); 
  }

  return nameWithoutExt.trim();
}

function parseInfoFile(infoPath) {
  try {
    const content = fs.readFileSync(infoPath, "utf8");
    const lines = content.split("\n");

    const data = {};

    lines.forEach(line => {
      const [key, ...valueParts] = line.split("=");
      if (!key || valueParts.length === 0) return;

      const value = valueParts.join("=").trim();

      // Si tiene comas → convertir en array
      if (value.includes(",")) {
        data[key.trim()] = value
          .split(",")
          .map(x => x.trim())
          .filter(x => x.length > 0);
      } else {
        data[key.trim()] = value;
      }
    });

    return data;
  } catch (err) {
    return {};
  }
}

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

      const infoPath = path.join(albumPath, "info.txt");
      const extraData = fs.existsSync(infoPath)
        ? parseInfoFile(infoPath)
        : {};

      const newAlbum = {
        id: String(albumId++),
        name: albumFolder,
        artistIds: newArtist.id,
        cover: `${albumPath}/cover.png`,
        ...extraData
      };
      albums.push(newAlbum);

      const songFiles = fs.readdirSync(albumPath);
      numInAlbum = 1;

      songFiles.forEach(file => {

        if (!file.endsWith(".mp3") && !file.endsWith(".m4a")) return;

        const songUrl = `${albumPath}/${file}`; 
        const cleanName = cleanSongName(file);

        const newSong = {
          id: String(songId++),
          title: cleanName,
          artistIds: newArtist.id,
          albumId: newAlbum.id,
          numberInAlbum: numInAlbum,
          url: songUrl
        };

        

        songs.push(newSong);
        queue.push(newSong);
        numInAlbum++;
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
