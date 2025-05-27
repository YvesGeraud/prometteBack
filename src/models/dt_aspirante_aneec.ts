import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ct_municipio, ct_municipioId } from './ct_municipio';
import type { ct_usuario, ct_usuarioId } from './ct_usuario';
import type { dt_diagnostico_aneec, dt_diagnostico_aneecId } from './dt_diagnostico_aneec';
import type { dt_informes_annec, dt_informes_annecId } from './dt_informes_annec';

export interface dt_aspirante_aneecAttributes {
  id_aspirante: number;
  curp: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  fecha_nacimiento: string;
  instituto: string;
  licenciatura: string;
  direccion: string;
  codigo_postal: string;
  ct_municipio_id: number;
  localidad: string;
  ruta_ine: string;
  ruta_comprobante_estudio: string;
  ruta_comprobante_domicilio: string;
  ruta_carta_compromiso: string;
  ruta_carta_compromiso_tutor: string;
  ruta_aviso_privacidad_aspirante: string;
  ruta_privacidad_usuario: string;
  ct_usuario_in: number;
  fecha_in: Date;
  ct_usuario_at?: number;
  fecha_at?: Date;
  status: string;
  tipo_documento: string;
  telefono: string;
}

export type dt_aspirante_aneecPk = "id_aspirante";
export type dt_aspirante_aneecId = dt_aspirante_aneec[dt_aspirante_aneecPk];
export type dt_aspirante_aneecOptionalAttributes = "id_aspirante" | "fecha_in" | "ct_usuario_at" | "fecha_at" | "status";
export type dt_aspirante_aneecCreationAttributes = Optional<dt_aspirante_aneecAttributes, dt_aspirante_aneecOptionalAttributes>;

export class dt_aspirante_aneec extends Model<dt_aspirante_aneecAttributes, dt_aspirante_aneecCreationAttributes> implements dt_aspirante_aneecAttributes {
  id_aspirante!: number;
  curp!: string;
  nombre!: string;
  apellido_paterno!: string;
  apellido_materno!: string;
  correo!: string;
  fecha_nacimiento!: string;
  instituto!: string;
  licenciatura!: string;
  direccion!: string;
  codigo_postal!: string;
  ct_municipio_id!: number;
  localidad!: string;
  ruta_ine!: string;
  ruta_comprobante_estudio!: string;
  ruta_comprobante_domicilio!: string;
  ruta_carta_compromiso!: string;
  ruta_carta_compromiso_tutor!: string;
  ruta_aviso_privacidad_aspirante!: string;
  ruta_privacidad_usuario!: string;
  ct_usuario_in!: number;
  fecha_in!: Date;
  ct_usuario_at?: number;
  fecha_at?: Date;
  status!: string;
  tipo_documento!: string;
  telefono!: string;

  // dt_aspirante_aneec belongsTo ct_municipio via ct_municipio_id
  ct_municipio!: ct_municipio;
  getCt_municipio!: Sequelize.BelongsToGetAssociationMixin<ct_municipio>;
  setCt_municipio!: Sequelize.BelongsToSetAssociationMixin<ct_municipio, ct_municipioId>;
  createCt_municipio!: Sequelize.BelongsToCreateAssociationMixin<ct_municipio>;
  // dt_aspirante_aneec belongsTo ct_usuario via ct_usuario_in
  ct_usuario_in_ct_usuario!: ct_usuario;
  getCt_usuario_in_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_in_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_in_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;
  // dt_aspirante_aneec belongsTo ct_usuario via ct_usuario_at
  ct_usuario_at_ct_usuario!: ct_usuario;
  getCt_usuario_at_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_at_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_at_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;
  // dt_aspirante_aneec hasMany dt_diagnostico_aneec via dt_aspirante_id
  dt_diagnostico_aneecs!: dt_diagnostico_aneec[];
  getDt_diagnostico_aneecs!: Sequelize.HasManyGetAssociationsMixin<dt_diagnostico_aneec>;
  setDt_diagnostico_aneecs!: Sequelize.HasManySetAssociationsMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  addDt_diagnostico_aneec!: Sequelize.HasManyAddAssociationMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  addDt_diagnostico_aneecs!: Sequelize.HasManyAddAssociationsMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  createDt_diagnostico_aneec!: Sequelize.HasManyCreateAssociationMixin<dt_diagnostico_aneec>;
  removeDt_diagnostico_aneec!: Sequelize.HasManyRemoveAssociationMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  removeDt_diagnostico_aneecs!: Sequelize.HasManyRemoveAssociationsMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  hasDt_diagnostico_aneec!: Sequelize.HasManyHasAssociationMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  hasDt_diagnostico_aneecs!: Sequelize.HasManyHasAssociationsMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  countDt_diagnostico_aneecs!: Sequelize.HasManyCountAssociationsMixin;
  // dt_aspirante_aneec hasMany dt_informes_annec via dt_aspirante_id
  dt_informes_annecs!: dt_informes_annec[];
  getDt_informes_annecs!: Sequelize.HasManyGetAssociationsMixin<dt_informes_annec>;
  setDt_informes_annecs!: Sequelize.HasManySetAssociationsMixin<dt_informes_annec, dt_informes_annecId>;
  addDt_informes_annec!: Sequelize.HasManyAddAssociationMixin<dt_informes_annec, dt_informes_annecId>;
  addDt_informes_annecs!: Sequelize.HasManyAddAssociationsMixin<dt_informes_annec, dt_informes_annecId>;
  createDt_informes_annec!: Sequelize.HasManyCreateAssociationMixin<dt_informes_annec>;
  removeDt_informes_annec!: Sequelize.HasManyRemoveAssociationMixin<dt_informes_annec, dt_informes_annecId>;
  removeDt_informes_annecs!: Sequelize.HasManyRemoveAssociationsMixin<dt_informes_annec, dt_informes_annecId>;
  hasDt_informes_annec!: Sequelize.HasManyHasAssociationMixin<dt_informes_annec, dt_informes_annecId>;
  hasDt_informes_annecs!: Sequelize.HasManyHasAssociationsMixin<dt_informes_annec, dt_informes_annecId>;
  countDt_informes_annecs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof dt_aspirante_aneec {
    return dt_aspirante_aneec.init({
    id_aspirante: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    curp: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellido_paterno: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellido_materno: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    instituto: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    licenciatura: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    codigo_postal: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    ct_municipio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ct_municipio',
        key: 'id_municipio'
      }
    },
    localidad: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ruta_ine: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ruta_comprobante_estudio: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ruta_comprobante_domicilio: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ruta_carta_compromiso: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ruta_carta_compromiso_tutor: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ruta_aviso_privacidad_aspirante: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ruta_privacidad_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ct_usuario_in: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ct_usuario',
        key: 'id_usuario'
      }
    },
    fecha_in: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    ct_usuario_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ct_usuario',
        key: 'id_usuario'
      }
    },
    fecha_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "EN PROCESO"
    },
    tipo_documento: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'dt_aspirante_aneec',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_aspirante" },
        ]
      },
      {
        name: "fk_ct_municipio_id",
        using: "BTREE",
        fields: [
          { name: "ct_municipio_id" },
        ]
      },
      {
        name: "fk_dt_aspirante_aneec_creado_por",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_in" },
        ]
      },
      {
        name: "fk_dt_aspirante_aneec_actualizado_por",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_at" },
        ]
      },
    ]
  });
  }
}
