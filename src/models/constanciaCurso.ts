import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface constanciaCursoAttributes {
  id_constanciaCurso: number;
  constanciaCurso?: string;
  claveCurso?: string;
  area?: string;
  tema?: string;
  responsable?: string;
  fecha?: string;
  duracion?: string;
  tipo?: string;
  modalidad?: string;
  constancia_design?: string;
}

export type constanciaCursoPk = "id_constanciaCurso";
export type constanciaCursoId = constanciaCurso[constanciaCursoPk];
export type constanciaCursoOptionalAttributes = "id_constanciaCurso" | "constanciaCurso" | "claveCurso" | "area" | "tema" | "responsable" | "fecha" | "duracion" | "tipo" | "modalidad" | "constancia_design";
export type constanciaCursoCreationAttributes = Optional<constanciaCursoAttributes, constanciaCursoOptionalAttributes>;

export class constanciaCurso extends Model<constanciaCursoAttributes, constanciaCursoCreationAttributes> implements constanciaCursoAttributes {
  id_constanciaCurso!: number;
  constanciaCurso?: string;
  claveCurso?: string;
  area?: string;
  tema?: string;
  responsable?: string;
  fecha?: string;
  duracion?: string;
  tipo?: string;
  modalidad?: string;
  constancia_design?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof constanciaCurso {
    return constanciaCurso.init({
    id_constanciaCurso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    constanciaCurso: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    claveCurso: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    area: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tema: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    responsable: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    duracion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tipo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    modalidad: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    constancia_design: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'constanciaCurso',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_constanciaCurso" },
        ]
      },
    ]
  });
  }
}
