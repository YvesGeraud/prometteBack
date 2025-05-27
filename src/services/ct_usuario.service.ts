import {
  ct_funcion,
  ct_puesto,
  initModels,
  rl_usuario_puesto,
} from "../models/init-models";
import { sequelize } from "../config/database";

//! Inicializar los modelos
const models = initModels(sequelize);

//! Obtener el modelo de ct_usuario
const { ct_usuario, rl_usuario_funcion } = models;

//* obtener todos los usuarios
class CtUsuarioService {
  async obtenerUsuarios() {
    try {
      const usuarios = await ct_usuario.findAll({
        attributes: [
          "id_usuario",
          "nombre_usuario",
          "contrasena",
          "telefono",
          "email",
          "email_institucional",
          "curp",
          "estado",
        ],
      });
      if (usuarios.length === 0) {
        return { message: "No hay usuarios" };
      }
      return usuarios;
    } catch (error) {
      console.error("Error al obtener usuarios en el servicio:", error);
      throw new Error("Error al obtener usuarios en el servicio");
    }
  }

  //* obtener un usuario por su id
  async obtenerUsuarioPorId(id: number) {
    try {
      const usuario = await ct_usuario.findByPk(id);
      if (!usuario) {
        return { message: "Usuario no encontrado" };
      }
      return usuario;
    } catch (error) {
      console.error("Error al obtener usuario por id en el servicio:", error);
      throw new Error("Error al obtener usuario por id en el servicio");
    }
  }

  //* obtener funciones por usuario
  async obtenerFuncionesPorUsuario(id: number) {
    try {
      const usuario = await ct_usuario.findByPk(id, {
        include: [
          {
            model: rl_usuario_funcion,
            as: "rl_usuario_funcions",
            attributes: ["id_usuario_funcion", "dt_funcion_id"],
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
      if (!usuario) {
        return { message: "Usuario no encontrado" };
      }
      return usuario;
    } catch (error) {
      console.error(
        "Error al obtener funciones por usuario en el servicio:",
        error
      );
      throw new Error("Error al obtener funciones por usuario en el servicio");
    }
  }

  //* obtener puestos por usuario
  async obtenerPuestosPorUsuario(id: number) {
    try {
      const usuario = await ct_usuario.findByPk(id, {
        include: [
          {
            model: rl_usuario_puesto,
            as: "rl_usuario_puestos",
            attributes: ["id_usuario_puesto", "ct_puesto_id"],
            include: [
              {
                model: ct_puesto,
                as: "ct_puesto",
                attributes: ["id_puesto", "nombre_puesto"],
              },
            ],
          },
        ],
      });
      if (!usuario) {
        return { message: "Usuario no encontrado" };
      }
      return usuario;
    } catch (error) {
      console.error(
        "Error al obtener puestos por usuario en el servicio:",
        error
      );
      throw new Error("Error al obtener puestos por usuario en el servicio");
    }
  }
}

export default new CtUsuarioService();
