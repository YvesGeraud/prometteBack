import express from "express";
import dotenv from "dotenv";
import config from "./config";
import retry from "async-retry";
import {
  sequelize,
  checkConnection,
  closeAllConnections,
} from "./config/database";
import { authenticateJWT } from "./middlewares/auth.middleware";
import corsMiddleware from "./middlewares/cors.middleware";
//* Rutas
import ctUsuarioRoutes from "./routes/ct_usuario.routes";
import ctPuestoRoutes from "./routes/ct_puesto.routes";
import ctFuncionRoutes from "./routes/ct_funcion.routes";
import ctConsumiblesProveedorRoutes from "./routes/ct_consumibles_proveedor.routes";

// Configurar variables de entorno
dotenv.config();

// crea la aplicacion express
const app = express();

// configura CORS usando el middleware
app.use(corsMiddleware);

// habilita el parseo de json en las solicitudes
app.use(express.json());

//* Rutas
app.use("/api/usuarios", /*authenticateJWT,*/ ctUsuarioRoutes);
app.use("/api/puestos", /*authenticateJWT,*/ ctPuestoRoutes);
app.use("/api/funciones", /*authenticateJWT,*/ ctFuncionRoutes);
app.use(
  "/api/consumibles-proveedor",
  /*authenticateJWT,*/ ctConsumiblesProveedorRoutes
);

// Mostrar información de configuración de la base de datos
console.log("📝 Configuración de la base de datos:");
console.log("- Nombre DB:", config.db.name);
console.log("- Usuario:", config.db.user);
console.log("- Host:", config.db.host);
console.log("- Puerto:", config.db.port);
console.log("- Entorno:", config.nodeEnv);

//* Sincroniza la base de datos y arranca el servidor
retry(
  async () => {
    console.log("Intentando conectar con la base de datos...");
    await checkConnection();
  },
  {
    retries: 5,
    minTimeout: 3000,
  }
)
  .then(async () => {
    console.log("✅ Conexión a la base de datos establecida");
    await sequelize.sync();
    console.log("✅ Sincronización completada");

    const server = app.listen(config.port, () => {
      console.log(
        `🚀 Servidor corriendo en el puerto ${config.port} (${config.nodeEnv})`
      );
    });

    //! Manejo de cierre gracioso
    process.on("SIGTERM", async () => {
      console.log("Recibida señal SIGTERM. Cerrando servidor...");
      server.close(async () => {
        await closeAllConnections();
        process.exit(0);
      });
    });

    //! Verificación periódica de la conexión
    setInterval(async () => {
      const isConnected = await checkConnection();
      if (!isConnected) {
        console.log("⚠️ Conexión perdida, intentando reconectar...");
        await checkConnection();
      }
    }, 30000); // Verificar cada 30 segundos
  })
  .catch((err: any) => {
    console.error(
      "❌ No se pudo conectar a la base de datos después de varios intentos:",
      err
    );
  });
