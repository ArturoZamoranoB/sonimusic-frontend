import { PrismaClient } from "../src/generated/prisma/index.js";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const DEEZER_BASE = "https://api.deezer.com";
const artistas = ["Coldplay", "Taylor Swift", "Ed Sheeran", "The Weeknd", "Billie Eilish"];

const obtenerCancionesDeezer = async (artista) => {
  const resArtista = await fetch(`${DEEZER_BASE}/search/artist?q=${encodeURIComponent(artista)}`);
  const dataArtista = await resArtista.json();
  const idArtista = dataArtista.data?.[0]?.id;

  if (!idArtista) return [];

  const resTop = await fetch(`${DEEZER_BASE}/artist/${idArtista}/top?limit=10`);
  const dataTop = await resTop.json();
  return dataTop.data || [];
};

const poblar = async () => {
  await prisma.cancion.deleteMany();
  await prisma.artista.deleteMany();

  for (const nombreArtista of artistas) {
    const canciones = await obtenerCancionesDeezer(nombreArtista);
    if (canciones.length === 0) continue;

    const artista = await prisma.artista.create({
      data: { nombre: nombreArtista },
    });

    for (const track of canciones) {
      await prisma.cancion.create({
        data: {
          titulo: track.title,
          duracion: `${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, "0")}`,
          portada: track.album.cover_medium || "",
          urlMP3: track.preview || "../public/music/default.mp3",
          artistaId: artista.id,
          deezerId: track.id, // ✅ Ahora se guarda el deezerId
        },
      });
    }

    console.log(`✔ Artista ${nombreArtista} y sus canciones fueron insertadas.`);
  }

  await prisma.$disconnect();
};

poblar().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
