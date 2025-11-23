const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;

// Carpeta donde tienes tu música dentro de public/
app.use("/music", express.static(path.join(__dirname, "public/music")));

app.listen(PORT, () => {
  console.log("Servidor local corriendo en: http://localhost:" + PORT);

  console.log("\nIMPORTANTE:");
  console.log("Si quieres reproducir en tu celular con Expo Go, usa tu IP local:");
  console.log("Ejemplo: http://192.168.x.x:3000/music/...");
});