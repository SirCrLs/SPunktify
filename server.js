const express = require("express");
const path = require("path");
const cors = require("cors");  

const app = express();
const PORT = 8080;

app.use(cors());

app.use("/music", express.static(path.join(__dirname, "public/music")));
app.use("/data", express.static(path.join(__dirname, "public/data")));

app.listen(PORT, () => {
  console.log("Servidor local corriendo en: http://localhost:" + PORT);

  console.log("\nIMPORTANTE:");
  console.log("Si quieres reproducir en tu celular con Expo Go, usa tu IP local:");
  console.log("Ejemplo: http://192.168.x.x:3000/music/...");
});