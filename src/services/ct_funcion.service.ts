import { initModels } from "../models/init-models";
import { sequelize } from "../config/database";

//! Inicializar los modelos
const models = initModels(sequelize);

//! Obtener el modelo de ct_usuario
const { ct_funcion } = models;

//* obtener todos los usuarios
class CtFuncionService {
  async obtenerFunciones() {
    try {
      const funciones = await ct_funcion.findAll({
        attributes: [
          "id_funcion",
          "ct_modulo_id",
          "nombre_funcion",
          "descripcion",
        ],
        where: {
          estado: 1,
        },
      });
      if (funciones.length === 0) {
        return { message: "No hay funciones" };
      }
      return funciones;
    } catch (error) {
      console.error("Error al obtener funciones en el servicio:", error);
      throw new Error("Error al obtener funciones en el servicio");
    }
  }
}

export default new CtFuncionService();
