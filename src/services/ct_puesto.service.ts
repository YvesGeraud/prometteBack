import {
  ct_funcion,
  initModels,
  rl_puesto_funcion,
} from "../models/init-models";
import { sequelize } from "../config/database";

//! Inicializar los modelos
const models = initModels(sequelize);

//! Obtener el modelo de ct_usuario
const { ct_puesto } = models;

//* obtener todos los usuarios
class CtPuestoService {
  async obtenerPuestos() {
    try {
      const puestos = await ct_puesto.findAll({
        attributes: ["id_puesto", "nombre_puesto", "descripcion"],
        where: {
          estado: 1,
        },
      });
      if (puestos.length === 0) {
        return { message: "No hay puestos" };
      }
      return puestos;
    } catch (error) {
      console.error("Error al obtener puestos en el servicio:", error);
      throw new Error("Error al obtener puestos en el servicio");
    }
  }

  //* obtener un puesto por su id
  async obtenerPuestoPorId(id: number) {
    try {
      const puesto = await ct_puesto.findByPk(id);
      if (!puesto) {
        return { message: "Puesto no encontrado" };
      }
      return puesto;
    } catch (error) {
      console.error("Error al obtener puesto por id en el servicio:", error);
      throw new Error("Error al obtener puesto por id en el servicio");
    }
  }

  //* obtener funciones por puesto
  async obtenerFuncionesPorPuesto(id: number) {
    try {
      const funciones = await ct_puesto.findByPk(id, {
        include: [
          {
            model: rl_puesto_funcion,
            as: "rl_puesto_funcions",
            attributes: ["id_puesto_funcion", "dt_funcion_id"],
            include: [
              {
                model: ct_funcion,
                as: "dt_funcion",
                attributes: ["id_funcion", "nombre_funcion"],
              },
            ],
          },
        ],
      });
      if (!funciones) {
        return { message: "Funciones no encontradas" };
      }
      return funciones;
    } catch (error) {
      console.error(
        "Error al obtener funciones por puesto en el servicio:",
        error
      );
      throw new Error("Error al obtener funciones por puesto en el servicio");
    }
  }
}

export default new CtPuestoService();
