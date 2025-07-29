import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

const limpiarBaseDeDatos = async () => {
  try {
    await prisma.cancion.deleteMany();
    await prisma.artista.deleteMany();
    console.log("✅ Todas las canciones y artistas fueron eliminados.");
  } catch (error) {
    console.error("❌ Error al borrar los datos:", error);
  } finally {
    await prisma.$disconnect();
  }
};

limpiarBaseDeDatos();
