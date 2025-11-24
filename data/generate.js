const fs = require("fs");
const { url } = require("inspector");
const path = require("path");
const os = require("os"); 

const basePath = "../public/music";

let artists = [];
let albums = [];
let songs = [];
let queue = [];

let artistId = 1;
let albumId = 1;
let songId = 1;

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1"; // fallback
}

function cleanSongName(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

  const parts = nameWithoutExt.split("-");

  if (parts.length > 1) {
    return parts.slice(1).join("-").trim(); 
  }

  return nameWithoutExt.trim();
}

const localIP = getLocalIP();

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

      const coverUrl = `http://${localIP}:8080/music/${artistFolder}/${albumFolder}/cover.png`.replace(/\\/g, "/");

      const newAlbum = {
        id: String(albumId++),
        name: albumFolder,
        artistName: newArtist.name,
        artistIds: newArtist.id,
        cover: coverUrl,
        ...extraData
      };

      albums.push(newAlbum);

      const songFiles = fs.readdirSync(albumPath);
      numInAlbum = 1;

      songFiles.forEach(file => {

        if (!file.endsWith(".mp3") && !file.endsWith(".m4a")) return;

        const songUrl = `http://${localIP}:8080/music/${artistFolder}/${albumFolder}/${file}`.replace(/\\/g, "/");

        const cleanName = cleanSongName(file);

        const newSong = {
          id: String(songId++),
          title: cleanName,
          artistIds: newArtist.id,
          artistName: newArtist.name,
          albumId: newAlbum.id,
          numberInAlbum: numInAlbum,
          cover: coverUrl,
          url: songUrl,
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
