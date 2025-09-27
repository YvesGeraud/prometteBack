/// <reference types="node" />
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...");

  // Seed para la tabla ct_usuario
  console.log("👤 Creando usuarios...");

  const usuarios = [
    {
      nombre_usuario: "admin",
      contrasena: "123456",
      estado: true,
    },
    {
      nombre_usuario: "sistemas",
      contrasena: "123456",
      estado: true,
    },
    {
      nombre_usuario: "inventario",
      contrasena: "123456",
      estado: true,
    },
    {
      nombre_usuario: "reportes",
      contrasena: "123456",
      estado: true,
    },
    {
      nombre_usuario: "auditor",
      contrasena: "123456",
      estado: true,
    },
  ];

  // Hash de contraseñas
  const usuariosConHash = await Promise.all(
    usuarios.map(async (usuario) => ({
      ...usuario,
      contrasena: await bcrypt.hash(usuario.contrasena, 10),
    }))
  );

  // Insertar usuarios
  for (const usuario of usuariosConHash) {
    const usuarioExistente = await prisma.ct_usuario.findUnique({
      where: { nombre_usuario: usuario.nombre_usuario },
    });

    if (!usuarioExistente) {
      await prisma.ct_usuario.create({
        data: usuario,
      });
      console.log(`✅ Usuario creado: ${usuario.nombre_usuario}`);
    } else {
      console.log(`⚠️  Usuario ya existe: ${usuario.nombre_usuario}`);
    }
  }

  console.log("🎉 Seed de usuarios completado!");
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
