import { initModels } from "../models/init-models";
import { sequelize } from "../config/database";

//! Inicializar los modelos
const models = initModels(sequelize);

//! Obtener el modelo de ct_consumibles_proveedor
const { ct_consumibles_proveedor } = models;

//* obtener todos los consumibles proveedor
class CtConsumiblesProveedorService {
  async obtenerConsumiblesProveedor() {
    try {
      const consumiblesProveedor = await ct_consumibles_proveedor.findAll({
        attributes: ["id_proveedor", "razon_social", "estado"],
        where: {
          estado: 1,
        },
      });
      if (consumiblesProveedor.length === 0) {
        return { message: "No hay consumibles proveedor" };
      }
      return consumiblesProveedor;
    } catch (error) {
      console.error(
        "Error al obtener consumibles proveedor en el servicio:",
        error
      );
      throw new Error("Error al obtener consumibles proveedor en el servicio");
    }
  }

  //* Crear un consumible proveedor
  async crearConsumibleProveedor(data: any) {
    const transaction = await sequelize.transaction();
    try {
      const consumibleProveedor = await ct_consumibles_proveedor.create(data, {
        transaction,
      });
      await transaction.commit();
      return consumibleProveedor;
    } catch (error: any) {
      await transaction.rollback();
      console.error("Error al crear el consumible proveedor service:", error);
      throw new Error("Error al crear el consumible proveedor service");
    }
  }
}

export default new CtConsumiblesProveedorService();
