import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface dt_consumible_entregaAttributes {
  id_entrega: number;
  ct_departamento_id: number;
  dt_inventario_id: number;
  ct_unidad_id: number;
  cantidad: number;
  ct_usuario_id: number;
  fecha_in: Date;
  fecha_at: Date;
}

export type dt_consumible_entregaPk = "id_entrega";
export type dt_consumible_entregaId = dt_consumible_entrega[dt_consumible_entregaPk];
export type dt_consumible_entregaOptionalAttributes = "id_entrega" | "fecha_in" | "fecha_at";
export type dt_consumible_entregaCreationAttributes = Optional<dt_consumible_entregaAttributes, dt_consumible_entregaOptionalAttributes>;

export class dt_consumible_entrega extends Model<dt_consumible_entregaAttributes, dt_consumible_entregaCreationAttributes> implements dt_consumible_entregaAttributes {
  id_entrega!: number;
  ct_departamento_id!: number;
  dt_inventario_id!: number;
  ct_unidad_id!: number;
  cantidad!: number;
  ct_usuario_id!: number;
  fecha_in!: Date;
  fecha_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof dt_consumible_entrega {
    return dt_consumible_entrega.init({
    id_entrega: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ct_departamento_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dt_inventario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ct_unidad_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    ct_usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_in: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    fecha_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'dt_consumible_entrega',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_entrega" },
        ]
      },
      {
        name: "ct_departamento_id",
        using: "BTREE",
        fields: [
          { name: "ct_departamento_id" },
        ]
      },
      {
        name: "dt_inventario_id",
        using: "BTREE",
        fields: [
          { name: "dt_inventario_id" },
        ]
      },
      {
        name: "ct_unidad_id",
        using: "BTREE",
        fields: [
          { name: "ct_unidad_id" },
        ]
      },
    ]
  });
  }
}
