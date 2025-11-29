import fs from "fs";

const supabaseUrl = "https://riuihnpygnrypkyjdvfv.supabase.co";
const bucket = "music";

// Leer CSV
const csv = fs.readFileSync("paths.csv", "utf8")
  .split("\n")
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(line => line.replace(/^"|"$/g, ""));

let artists = {};
let albums = {};
let songs = [];

let artistId = 1;
let albumId = 1;
let songId = 1;

for (const filePath of csv) {
  const parts = filePath.split("/");

  if (parts.length < 3) continue;

  const artistName = parts[0];
  const albumName = parts[1];
  const fileName = parts[2];

  // Registrar artista
  if (!artists[artistName]) {
    artists[artistName] = {
      id: String(artistId++),
      name: artistName
    };
  }

  // Registrar álbum
  const albumKey = `${artistName}__${albumName}`;
  if (!albums[albumKey]) {
    const coverUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${encodeURI(artistName)}/${encodeURI(albumName)}/cover.png`;

    albums[albumKey] = {
      id: String(albumId++),
      name: albumName,
      artistName,
      artistId: artists[artistName].id,
      cover: coverUrl
    };
  }

  // ¿Es canción?
  if (fileName.toLowerCase().endsWith(".m4a")) {
    const album = albums[albumKey];
    const artist = artists[artistName];

    // Sacar número del archivo: "10- LosT.m4a" → 10
    const numberMatch = fileName.match(/^(\d+)-/);
    const numberInAlbum = numberMatch ? parseInt(numberMatch[1]) : null;

    // Título sin extensión
    const title = fileName.replace(".m4a", "").replace(/^\d+-/, "").trim();

    // URL pública
    const songUrl =
      `${supabaseUrl}/storage/v1/object/public/${bucket}/` +
      parts.map(p => encodeURI(p)).join("/");

    songs.push({
      id: String(songId++),
      title,
      artistIds: artist.id,
      artistName: artist.name,
      albumId: album.id,
      numberInAlbum,
      cover: album.cover,
      url: songUrl
    });
  }
}

// Ordenar canciones por: artista → álbum → numberInAlbum
songs.sort((a, b) => {
  if (a.artistName !== b.artistName) return a.artistName.localeCompare(b.artistName);
  if (a.albumId !== b.albumId) return Number(a.albumId) - Number(b.albumId);
  return a.numberInAlbum - b.numberInAlbum;
});

fs.writeFileSync("artists.json", JSON.stringify(Object.values(artists), null, 2));
fs.writeFileSync("albums.json", JSON.stringify(Object.values(albums), null, 2));
fs.writeFileSync("songs.json", JSON.stringify(songs, null, 2));

console.log("JSONs generados ✔");
