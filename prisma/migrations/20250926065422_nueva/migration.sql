-- CreateTable
CREATE TABLE `ct_bitacora_accion` (
    `id_ct_bitacora_accion` INTEGER NOT NULL AUTO_INCREMENT,
    `accion` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `activo` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id_ct_bitacora_accion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_bitacora_entidad` (
    `id_ct_bitacora_entidad` INTEGER NOT NULL AUTO_INCREMENT,
    `entidad` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `activo` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id_ct_bitacora_entidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_capitulo` (
    `id_capitulo` INTEGER NOT NULL AUTO_INCREMENT,
    `clave_capitulo` INTEGER NOT NULL,
    `nombre_capitulo` VARCHAR(100) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id_capitulo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_consumible_factura` (
    `id_factura` INTEGER NOT NULL AUTO_INCREMENT,
    `factura` VARCHAR(255) NOT NULL,
    `ct_provedor_id` INTEGER NOT NULL,
    `activo` TINYINT NOT NULL DEFAULT 1,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL,

    INDEX `FK_ct_facturas_ct_proveedor`(`ct_provedor_id`),
    PRIMARY KEY (`id_factura`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_consumibles_proveedor` (
    `id_proveedor` INTEGER NOT NULL AUTO_INCREMENT,
    `razon_social` VARCHAR(255) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `uk_razon_social`(`razon_social`(191)),
    PRIMARY KEY (`id_proveedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_correspondencia_estado` (
    `id_estado` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `uk_corresp_estado_nombre`(`nombre`),
    PRIMARY KEY (`id_estado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_correspondencia_formato_entrega` (
    `id_formato` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `uk_corresp_formato_nombre`(`nombre`),
    PRIMARY KEY (`id_formato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_correspondencia_prioridad` (
    `id_prioridad` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `uk_corresp_prioridad_nombre`(`nombre`),
    PRIMARY KEY (`id_prioridad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_dispositivo` (
    `id_dispositivo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_dispositivo` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(255) NULL,

    UNIQUE INDEX `nombre_dispositivo_UNIQUE`(`nombre_dispositivo`),
    PRIMARY KEY (`id_dispositivo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_documentos_aneec` (
    `id_tipo_documento` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NULL,
    `vigencia` ENUM('S', 'N') NULL,

    PRIMARY KEY (`id_tipo_documento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_financiamiento` (
    `id_financiamiento` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_financiamiento` VARCHAR(50) NOT NULL DEFAULT '0',
    `estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id_financiamiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_modulo` (
    `id_modulo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_modulo` VARCHAR(100) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `ct_usuario_in` INTEGER NOT NULL,
    `ct_usuario_at` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_ct_modulo_actualizado_por`(`ct_usuario_at`),
    INDEX `fk_ct_modulo_creado_por`(`ct_usuario_in`),
    PRIMARY KEY (`id_modulo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_partida` (
    `id_partida` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_capitulo_id` INTEGER NOT NULL,
    `clave_partida` VARCHAR(10) NOT NULL,
    `nombre_partida` VARCHAR(255) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_ct_partida_ct_capitulo`(`ct_capitulo_id`),
    PRIMARY KEY (`id_partida`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_producto_consumible` (
    `id_producto` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_partida_id` INTEGER NOT NULL DEFAULT 0,
    `nombre_producto` VARCHAR(500) NOT NULL,
    `precio` DECIMAL(20, 2) NOT NULL DEFAULT 0.00,
    `ct_unidad_id` INTEGER NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `ct_usuario_in` INTEGER NOT NULL DEFAULT 1,
    `ct_usuario_at` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_ct_producto_consumible_actualizado_por`(`ct_usuario_at`),
    INDEX `fk_ct_producto_consumible_creado_por`(`ct_usuario_in`),
    INDEX `fk_ct_producto_consumible_ct_partida`(`ct_partida_id`),
    INDEX `fk_ct_producto_consumible_unidad`(`ct_unidad_id`),
    PRIMARY KEY (`id_producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_puesto` (
    `id_puesto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `id_usuario_crea` INTEGER NOT NULL DEFAULT 1,
    `id_usuario_modifica` INTEGER NULL,
    `fecha_crea` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_modifica` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_puesto_usuario_crea`(`id_usuario_crea`),
    INDEX `fk_puesto_usuario_modifica`(`id_usuario_modifica`),
    PRIMARY KEY (`id_puesto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_unidad_medida` (
    `id_unidad` INTEGER NOT NULL AUTO_INCREMENT,
    `clave_unidad` VARCHAR(4) NULL,
    `nombre_unidad` VARCHAR(100) NULL,

    PRIMARY KEY (`id_unidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_usuario` VARCHAR(255) NOT NULL,
    `contrasena` VARCHAR(255) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `id_dt_rupeet_informacion` INTEGER NULL,
    `ct_usuario_in` INTEGER NOT NULL,
    `ct_usuario_at` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `nombre_usuario_UNIQUE`(`nombre_usuario`),
    INDEX `fk_ct_usuario_actualizado_por`(`ct_usuario_at`),
    INDEX `fk_ct_usuario_creado_por`(`ct_usuario_in`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_aspirante_aneec` (
    `id_aspirante` INTEGER NOT NULL AUTO_INCREMENT,
    `curp` VARCHAR(18) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido_paterno` VARCHAR(50) NOT NULL,
    `apellido_materno` VARCHAR(50) NOT NULL,
    `telefono` VARCHAR(15) NOT NULL,
    `correo` VARCHAR(50) NOT NULL,
    `fecha_nacimiento` DATE NOT NULL,
    `instituto` VARCHAR(100) NOT NULL,
    `licenciatura` VARCHAR(50) NOT NULL,
    `direccion` VARCHAR(50) NOT NULL,
    `codigo_postal` VARCHAR(10) NOT NULL,
    `ct_municipio_id` INTEGER NOT NULL,
    `localidad` VARCHAR(100) NOT NULL,
    `ruta_ine` VARCHAR(50) NOT NULL,
    `tipo_documento` VARCHAR(45) NOT NULL,
    `ruta_comprobante_estudio` VARCHAR(50) NOT NULL,
    `ruta_comprobante_domicilio` VARCHAR(50) NOT NULL,
    `ruta_carta_compromiso` VARCHAR(50) NOT NULL,
    `ruta_aviso_privacidad_aspirante` VARCHAR(50) NOT NULL,
    `ct_usuario_in` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ct_usuario_at` INTEGER NULL,
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` VARCHAR(50) NOT NULL DEFAULT 'EN PROCESO',

    INDEX `fk_ct_municipio_id`(`ct_municipio_id`),
    INDEX `fk_dt_aspirante_aneec_actualizado_por`(`ct_usuario_at`),
    INDEX `fk_dt_aspirante_aneec_creado_por`(`ct_usuario_in`),
    PRIMARY KEY (`id_aspirante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_bitacora_movimiento` (
    `id_dt_bitacora_movimiento` BIGINT NOT NULL AUTO_INCREMENT,
    `id_ct_bitacora_accion` INTEGER NOT NULL,
    `id_ct_bitacora_entidad` INTEGER NOT NULL,
    `id_registro_afectado` BIGINT NULL,
    `id_usuario` INTEGER NULL,
    `ip_origen` VARCHAR(45) NOT NULL,
    `id_dispositivo` INTEGER NULL,
    `estado_accion` BOOLEAN NOT NULL,
    `datos_anteriores` LONGTEXT NULL,
    `datos_nuevos` LONGTEXT NULL,
    `fecha_in` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id_ct_bitacora_accion`(`id_ct_bitacora_accion`),
    INDEX `id_ct_bitacora_entidad`(`id_ct_bitacora_entidad`),
    INDEX `id_dispositivo`(`id_dispositivo`),
    INDEX `id_usuario`(`id_usuario`),
    PRIMARY KEY (`id_dt_bitacora_movimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_consumible_entrega` (
    `id_entrega` INTEGER NOT NULL AUTO_INCREMENT,
    `folio` VARCHAR(15) NOT NULL,
    `ct_area_id` INTEGER NOT NULL,
    `dt_inventario_id` INTEGER NOT NULL,
    `ct_unidad_id` INTEGER NOT NULL,
    `cantidad` DECIMAL(10, 2) NOT NULL,
    `ct_usuario_id` INTEGER NOT NULL,
    `observaciones` VARCHAR(255) NOT NULL DEFAULT '',
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `folio_formato` VARCHAR(20) NULL,

    INDEX `ct_area_id`(`ct_area_id`),
    INDEX `ct_unidad_id`(`ct_unidad_id`),
    INDEX `ct_usuario_id`(`ct_usuario_id`),
    INDEX `dt_inventario_id`(`dt_inventario_id`),
    INDEX `fk_dt_consumible_entrega_formato_idx`(`folio_formato`),
    PRIMARY KEY (`id_entrega`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_consumible_inventario` (
    `id_inventario` INTEGER NOT NULL AUTO_INCREMENT,
    `folio` VARCHAR(20) NOT NULL,
    `descripcion` TEXT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 0,
    `resta` INTEGER NOT NULL DEFAULT 0,
    `ct_partida_id` INTEGER NOT NULL,
    `ct_unidad_id` INTEGER NOT NULL,
    `ct_factura_id` INTEGER NOT NULL,
    `observaciones` VARCHAR(255) NOT NULL DEFAULT '',
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `folio`(`folio`),
    INDEX `ct_factura_id`(`ct_factura_id`),
    INDEX `ct_partida_id`(`ct_partida_id`),
    INDEX `ct_unidad_id`(`ct_unidad_id`),
    PRIMARY KEY (`id_inventario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_correspondencia` (
    `id_correspondencia` INTEGER NOT NULL AUTO_INCREMENT,
    `asunto` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NULL,
    `remitente` VARCHAR(255) NOT NULL,
    `destinatario` VARCHAR(255) NOT NULL,
    `id_prioridad` INTEGER NOT NULL,
    `id_tipo` INTEGER NOT NULL,
    `id_formato` INTEGER NOT NULL,
    `folio` VARCHAR(100) NULL,
    `fecha_documento` DATE NOT NULL,
    `fecha_registro` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id_usuario_crea` INTEGER NOT NULL,
    `id_usuario_modifica` INTEGER NULL,

    INDEX `fk_corresp_formato`(`id_formato`),
    INDEX `fk_corresp_prioridad`(`id_prioridad`),
    INDEX `fk_corresp_tipo`(`id_tipo`),
    INDEX `fk_corresp_usuario_crea`(`id_usuario_crea`),
    INDEX `fk_corresp_usuario_modifica`(`id_usuario_modifica`),
    PRIMARY KEY (`id_correspondencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_diagnostico_aneec` (
    `id_diagnostico` INTEGER NOT NULL AUTO_INCREMENT,
    `curp` VARCHAR(18) NOT NULL,
    `nombreCompleto` VARCHAR(100) NOT NULL,
    `ct_municipio_id` INTEGER NOT NULL,
    `tipo_necesidad` VARCHAR(100) NOT NULL,
    `rehabilitacion_fisica` ENUM('S', 'N') NOT NULL,
    `ruta_diagnostico` VARCHAR(50) NOT NULL,
    `dt_aspirante_id` INTEGER NOT NULL,
    `ct_usuario_in` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ct_usuario_at` INTEGER NULL,
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ruta_INE_tutor` VARCHAR(50) NOT NULL,
    `ruta_acta_nacimiento_usuario` VARCHAR(50) NOT NULL,
    `ruta_comprobante_domicilio` VARCHAR(50) NOT NULL,
    `ruta_privacidad_usuario` VARCHAR(50) NOT NULL,
    `ruta_carta_compromiso_usuario` VARCHAR(50) NOT NULL,

    INDEX `fk_ct_municipio_id_diagnostico`(`ct_municipio_id`),
    INDEX `fk_dt_aspirante_id`(`dt_aspirante_id`),
    INDEX `fk_dt_diagnostico_aneec_actualizado_por`(`ct_usuario_at`),
    INDEX `fk_dt_diagnostico_aneec_creado_por`(`ct_usuario_in`),
    PRIMARY KEY (`id_diagnostico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_funcion` (
    `id_funcion` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_modulo_id` INTEGER NULL,
    `nombre_funcion` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `ct_usuario_in` INTEGER NOT NULL,
    `ct_usuario_at` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_dt_funcion_actualizado_por`(`ct_usuario_at`),
    INDEX `fk_dt_funcion_creado_por`(`ct_usuario_in`),
    INDEX `fk_dt_funcion_ct_modulo`(`ct_modulo_id`),
    PRIMARY KEY (`id_funcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_informes_aneec` (
    `id_informe` INTEGER NOT NULL AUTO_INCREMENT,
    `ruta_informe` VARCHAR(50) NOT NULL,
    `dt_aspirante_id` INTEGER NOT NULL,
    `dt_diagnostico_id` INTEGER NOT NULL,
    `ct_usuario_in` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ct_usuario_at` INTEGER NULL,
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_dt_aspirante_id_informe`(`dt_aspirante_id`),
    INDEX `fk_dt_diagnostico_id_informe`(`dt_diagnostico_id`),
    INDEX `fk_dt_informes_annec_actualizado_por`(`ct_usuario_at`),
    INDEX `fk_dt_informes_annec_creado_por`(`ct_usuario_in`),
    PRIMARY KEY (`id_informe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_planeaciones_aneec` (
    `id_planeacion` INTEGER NOT NULL AUTO_INCREMENT,
    `ruta_documento` VARCHAR(50) NOT NULL,
    `id_tipo_documento` INTEGER NOT NULL,
    `dt_aspirante_id` INTEGER NOT NULL,
    `dt_diagnostico_id` INTEGER NOT NULL,
    `ct_usuario_in` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ct_usuario_at` INTEGER NULL,
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_dt_planeaciones_aneec__actualizado_por`(`ct_usuario_at`),
    INDEX `FK_dt_planeaciones_aneec_ct_documentos_aneec`(`id_tipo_documento`),
    INDEX `FK_dt_planeaciones_aneec_ct_usuario_creado_por`(`ct_usuario_in`),
    INDEX `FK_dt_planeaciones_aneec_dt_aspirante_aneec`(`dt_aspirante_id`),
    INDEX `FK_dt_planeaciones_aneec_dt_diagnostico_aneec`(`dt_diagnostico_id`),
    PRIMARY KEY (`id_planeacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_proyecto_anual` (
    `id_proyecto_anual` INTEGER NOT NULL AUTO_INCREMENT,
    `año` INTEGER NOT NULL,
    `dt_techo_id` INTEGER NOT NULL,
    `monto_asignado` DECIMAL(15, 3) NOT NULL DEFAULT 0.000,
    `monto_utilizado` DECIMAL(15, 3) NOT NULL DEFAULT 0.000,
    `monto_disponible` DECIMAL(15, 3) NOT NULL DEFAULT 0.000,
    `descripcion` VARCHAR(255) NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_proyecto_anual_techo_presupuestal_idx`(`dt_techo_id`),
    INDEX `idx_proyecto_anual_año`(`año`),
    PRIMARY KEY (`id_proyecto_anual`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_techo_presupuesto` (
    `id_techo` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_area_id` INTEGER NOT NULL DEFAULT 0,
    `ct_capitulo_id` INTEGER NOT NULL DEFAULT 0,
    `ct_financiamiento_id` INTEGER NOT NULL DEFAULT 0,
    `cantidad_presupuestada` DECIMAL(15, 3) NOT NULL DEFAULT 0.000,
    `ct_usuario_in` INTEGER NOT NULL DEFAULT 1,
    `ct_usuario_at` INTEGER NULL DEFAULT 0,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,

    INDEX `fk_techo_area_idx`(`ct_area_id`),
    INDEX `fk_techo_capitulo`(`ct_capitulo_id`),
    INDEX `fk_techo_financiamiento`(`ct_financiamiento_id`),
    INDEX `fk_techo_usuario_at`(`ct_usuario_at`),
    INDEX `fk_techo_usuario_in`(`ct_usuario_in`),
    PRIMARY KEY (`id_techo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_analista_unidad` (
    `id_puesto_unidad` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_usuario_id` INTEGER NOT NULL DEFAULT 0,
    `rl_area_financiero` INTEGER NOT NULL DEFAULT 1,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ct_usuario_in` INTEGER NOT NULL DEFAULT 1,
    `ct_usuario_at` INTEGER NULL,

    INDEX `FK_rl_analista_unidad_ct_usuario`(`ct_usuario_in`),
    INDEX `FK_rl_analista_unidad_ct_usuario_2`(`ct_usuario_id`),
    INDEX `fk_ct_area_id_area`(`rl_area_financiero`),
    PRIMARY KEY (`id_puesto_unidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_area_financiero` (
    `id_area_fin` INTEGER NOT NULL AUTO_INCREMENT,
    `id_financiero` INTEGER NOT NULL DEFAULT 0,
    `id_area_infra` INTEGER NOT NULL DEFAULT 0,
    `ct_usuario_in` INTEGER NOT NULL DEFAULT 1,
    `ct_usuario_at` INTEGER NULL DEFAULT 1,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_area_fin_usuario_at`(`ct_usuario_at`),
    INDEX `fk_area_fin_usuario_in`(`ct_usuario_in`),
    INDEX `idx_id_area_infra`(`id_area_infra`),
    PRIMARY KEY (`id_area_fin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_correspondencia_usuario_estado` (
    `id_correspondencia_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `id_correspondencia` INTEGER NOT NULL,
    `id_usuario_puesto` INTEGER NOT NULL,
    `id_estado` INTEGER NOT NULL,
    `tipo_turnado` ENUM('respuesta', 'consulta') NOT NULL DEFAULT 'respuesta',
    `observaciones` VARCHAR(300) NULL,
    `id_usuario_crea` INTEGER NOT NULL,
    `fecha_crea` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_rl_corresp_corresp`(`id_correspondencia`),
    INDEX `fk_rl_corresp_estado`(`id_estado`),
    INDEX `fk_rl_corresp_usuario_crea`(`id_usuario_crea`),
    INDEX `fk_rl_corresp_usuario_puesto`(`id_usuario_puesto`),
    PRIMARY KEY (`id_correspondencia_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_entrega_formato` (
    `id_formato` INTEGER NOT NULL AUTO_INCREMENT,
    `folio_formato` VARCHAR(20) NOT NULL,
    `mes_cantidad` VARCHAR(100) NULL,
    `persona_recibe` VARCHAR(255) NULL,
    `ct_usuario_id` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `folio_formato_UNIQUE`(`folio_formato`),
    INDEX `fk_rl_entrega_formato_ct_usuario_idx`(`ct_usuario_id`),
    PRIMARY KEY (`id_formato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_justificacion` (
    `id_justificacion` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_partida_id` INTEGER NOT NULL,
    `ct_area_id` INTEGER NOT NULL,
    `dt_techo_id` INTEGER NULL DEFAULT 1,
    `justificacion` TEXT NOT NULL,
    `ct_usuario_id` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_rl_justificacion_dt_techo_presupuesto`(`dt_techo_id`),
    INDEX `FK_rl_justificacion_rl_area_financiero`(`ct_area_id`),
    INDEX `idx_justificacion_area`(`ct_area_id`),
    INDEX `idx_justificacion_area_financiera`(`ct_area_id`),
    INDEX `idx_justificacion_partida`(`ct_partida_id`),
    INDEX `idx_justificacion_partida_area`(`ct_partida_id`, `ct_area_id`),
    INDEX `idx_justificacion_partida_area_financiera`(`ct_partida_id`, `ct_area_id`),
    INDEX `idx_justificacion_usuario`(`ct_usuario_id`),
    PRIMARY KEY (`id_justificacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_partida_area` (
    `id_partida_area` INTEGER NOT NULL AUTO_INCREMENT,
    `id_area_infra` INTEGER NOT NULL DEFAULT 0,
    `id_partida` INTEGER NOT NULL DEFAULT 0,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `ct_usuario_in` INTEGER NOT NULL DEFAULT 0,
    `ct_usuario_at` INTEGER NULL,

    INDEX `FK_rl_partida_area_ct_partida`(`id_partida`),
    INDEX `FK_rl_partida_area_rl_area_financiero`(`id_area_infra`),
    PRIMARY KEY (`id_partida_area`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_producto_area` (
    `id_producto_area` INTEGER NOT NULL AUTO_INCREMENT,
    `id_producto` INTEGER NOT NULL,
    `id_area_infra` INTEGER NOT NULL,
    `ct_usuario_in` INTEGER NOT NULL DEFAULT 1,
    `ct_usuario_at` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,

    INDEX `FK_rl_producto_area_ct_producto_consumible`(`id_producto`),
    INDEX `FK_rl_producto_area_rl_area_financiero`(`id_area_infra`),
    PRIMARY KEY (`id_producto_area`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_producto_requisicion` (
    `id_producto_requisicion` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_area_id` INTEGER NOT NULL DEFAULT 0,
    `dt_techo_id` INTEGER NOT NULL DEFAULT 0,
    `ct_productos_id` INTEGER NOT NULL DEFAULT 0,
    `cantidad` DECIMAL(10, 3) NOT NULL DEFAULT 0.000,
    `mes` VARCHAR(2) NOT NULL DEFAULT '0',
    `total` DECIMAL(15, 3) NOT NULL,
    `ct_usuarios_in` INTEGER NOT NULL DEFAULT 0,
    `ct_usuarios_at` INTEGER NULL DEFAULT 0,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK__ct_area_idx`(`ct_area_id`),
    INDEX `FK__ct_producto_consumible`(`ct_productos_id`),
    INDEX `FK__ct_usuario`(`ct_usuarios_in`),
    INDEX `FK_rl_producto_requisicion_dt_techo_presupuesto`(`dt_techo_id`),
    PRIMARY KEY (`id_producto_requisicion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_puesto_funcion` (
    `id_puesto_funcion` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_puesto_id` INTEGER NULL,
    `dt_funcion_id` INTEGER NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `ct_usuario_in` INTEGER NOT NULL,
    `ct_usuario_at` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_rl_puesto_funcion_actualizado_por`(`ct_usuario_at`),
    INDEX `fk_rl_puesto_funcion_creado_por`(`ct_usuario_in`),
    INDEX `fk_rl_puesto_funcion_funcion`(`dt_funcion_id`),
    INDEX `fk_rl_puesto_funcion_puesto`(`ct_puesto_id`),
    PRIMARY KEY (`id_puesto_funcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_usuario_funcion` (
    `id_usuario_funcion` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_usuario_id` INTEGER NULL,
    `dt_funcion_id` INTEGER NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `ct_usuario_in` INTEGER NOT NULL,
    `ct_usuario_at` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_rl_usuario_funcion_actualizado_por`(`ct_usuario_at`),
    INDEX `fk_rl_usuario_funcion_creado_por`(`ct_usuario_in`),
    INDEX `fk_rl_usuario_funcion_funcion`(`dt_funcion_id`),
    INDEX `fk_rl_usuario_funcion_usuario`(`ct_usuario_id`),
    PRIMARY KEY (`id_usuario_funcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_usuario_puesto` (
    `id_usuario_puesto` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_usuario_id` INTEGER NOT NULL,
    `ct_puesto_id` INTEGER NOT NULL,
    `id_area` INTEGER NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `ct_usuario_in` INTEGER NOT NULL,
    `ct_usuario_at` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_rl_usuario_puesto_actualizado_por`(`ct_usuario_at`),
    INDEX `fk_rl_usuario_puesto_creado_por`(`ct_usuario_in`),
    INDEX `fk_rl_usuario_puesto_ct_puesto`(`ct_puesto_id`),
    INDEX `fk_rl_usuario_puesto_ct_usuario`(`ct_usuario_id`),
    PRIMARY KEY (`id_usuario_puesto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ct_consumible_factura` ADD CONSTRAINT `FK_ct_facturas_ct_proveedor` FOREIGN KEY (`ct_provedor_id`) REFERENCES `ct_consumibles_proveedor`(`id_proveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_modulo` ADD CONSTRAINT `fk_ct_modulo_actualizado_por` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ct_modulo` ADD CONSTRAINT `fk_ct_modulo_creado_por` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ct_partida` ADD CONSTRAINT `FK_ct_partida_ct_capitulo` FOREIGN KEY (`ct_capitulo_id`) REFERENCES `ct_capitulo`(`id_capitulo`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ct_producto_consumible` ADD CONSTRAINT `fk_ct_producto_consumible_actualizado_por` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ct_producto_consumible` ADD CONSTRAINT `fk_ct_producto_consumible_creado_por` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ct_producto_consumible` ADD CONSTRAINT `fk_ct_producto_consumible_ct_partida` FOREIGN KEY (`ct_partida_id`) REFERENCES `ct_partida`(`id_partida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_producto_consumible` ADD CONSTRAINT `fk_ct_producto_consumible_unidad` FOREIGN KEY (`ct_unidad_id`) REFERENCES `ct_unidad_medida`(`id_unidad`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ct_puesto` ADD CONSTRAINT `fk_puesto_usuario_crea` FOREIGN KEY (`id_usuario_crea`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ct_puesto` ADD CONSTRAINT `fk_puesto_usuario_modifica` FOREIGN KEY (`id_usuario_modifica`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ct_usuario` ADD CONSTRAINT `fk_ct_usuario_actualizado_por` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ct_usuario` ADD CONSTRAINT `fk_ct_usuario_creado_por` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_aspirante_aneec` ADD CONSTRAINT `fk_dt_aspirante_aneec_actualizado_por` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_aspirante_aneec` ADD CONSTRAINT `fk_dt_aspirante_aneec_creado_por` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_bitacora_movimiento` ADD CONSTRAINT `dt_bitacora_movimiento_ibfk_1` FOREIGN KEY (`id_ct_bitacora_accion`) REFERENCES `ct_bitacora_accion`(`id_ct_bitacora_accion`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_bitacora_movimiento` ADD CONSTRAINT `dt_bitacora_movimiento_ibfk_2` FOREIGN KEY (`id_ct_bitacora_entidad`) REFERENCES `ct_bitacora_entidad`(`id_ct_bitacora_entidad`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_bitacora_movimiento` ADD CONSTRAINT `dt_bitacora_movimiento_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_bitacora_movimiento` ADD CONSTRAINT `dt_bitacora_movimiento_ibfk_4` FOREIGN KEY (`id_dispositivo`) REFERENCES `ct_dispositivo`(`id_dispositivo`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_consumible_entrega` ADD CONSTRAINT `FK_dt_consumible_entrega_ct_unidad_medida` FOREIGN KEY (`ct_unidad_id`) REFERENCES `ct_unidad_medida`(`id_unidad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_entrega` ADD CONSTRAINT `FK_dt_consumible_entrega_ct_usuario` FOREIGN KEY (`ct_usuario_id`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_entrega` ADD CONSTRAINT `FK_dt_consumible_entrega_dt_consumible_inventario` FOREIGN KEY (`dt_inventario_id`) REFERENCES `dt_consumible_inventario`(`id_inventario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_entrega` ADD CONSTRAINT `FK_dt_consumible_entrega_rl_entrega_formato` FOREIGN KEY (`folio_formato`) REFERENCES `rl_entrega_formato`(`folio_formato`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_inventario` ADD CONSTRAINT `FK_dt_inventario_ct_facturas` FOREIGN KEY (`ct_factura_id`) REFERENCES `ct_consumible_factura`(`id_factura`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_inventario` ADD CONSTRAINT `FK_dt_inventario_ct_partida` FOREIGN KEY (`ct_partida_id`) REFERENCES `ct_partida`(`id_partida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_inventario` ADD CONSTRAINT `FK_dt_inventario_ct_unidad_medida` FOREIGN KEY (`ct_unidad_id`) REFERENCES `ct_unidad_medida`(`id_unidad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_correspondencia` ADD CONSTRAINT `fk_corresp_formato` FOREIGN KEY (`id_formato`) REFERENCES `ct_correspondencia_formato_entrega`(`id_formato`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_correspondencia` ADD CONSTRAINT `fk_corresp_prioridad` FOREIGN KEY (`id_prioridad`) REFERENCES `ct_correspondencia_prioridad`(`id_prioridad`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_correspondencia` ADD CONSTRAINT `fk_corresp_usuario_crea` FOREIGN KEY (`id_usuario_crea`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_correspondencia` ADD CONSTRAINT `fk_corresp_usuario_modifica` FOREIGN KEY (`id_usuario_modifica`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_diagnostico_aneec` ADD CONSTRAINT `fk_dt_aspirante_id` FOREIGN KEY (`dt_aspirante_id`) REFERENCES `dt_aspirante_aneec`(`id_aspirante`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_diagnostico_aneec` ADD CONSTRAINT `fk_dt_diagnostico_aneec_actualizado_por` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_diagnostico_aneec` ADD CONSTRAINT `fk_dt_diagnostico_aneec_creado_por` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_funcion` ADD CONSTRAINT `fk_dt_funcion_actualizado_por` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_funcion` ADD CONSTRAINT `fk_dt_funcion_creado_por` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_funcion` ADD CONSTRAINT `fk_dt_funcion_ct_modulo` FOREIGN KEY (`ct_modulo_id`) REFERENCES `ct_modulo`(`id_modulo`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_informes_aneec` ADD CONSTRAINT `fk_dt_aspirante_id_informe` FOREIGN KEY (`dt_aspirante_id`) REFERENCES `dt_aspirante_aneec`(`id_aspirante`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_informes_aneec` ADD CONSTRAINT `fk_dt_diagnostico_id_informe` FOREIGN KEY (`dt_diagnostico_id`) REFERENCES `dt_diagnostico_aneec`(`id_diagnostico`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_informes_aneec` ADD CONSTRAINT `fk_dt_informes_annec_actualizado_por` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_informes_aneec` ADD CONSTRAINT `fk_dt_informes_annec_creado_por` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_planeaciones_aneec` ADD CONSTRAINT `FK_dt_planeaciones_aneec__actualizado_por` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_planeaciones_aneec` ADD CONSTRAINT `FK_dt_planeaciones_aneec_ct_documentos_aneec` FOREIGN KEY (`id_tipo_documento`) REFERENCES `ct_documentos_aneec`(`id_tipo_documento`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_planeaciones_aneec` ADD CONSTRAINT `FK_dt_planeaciones_aneec_ct_usuario_creado_por` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_planeaciones_aneec` ADD CONSTRAINT `FK_dt_planeaciones_aneec_dt_aspirante_aneec` FOREIGN KEY (`dt_aspirante_id`) REFERENCES `dt_aspirante_aneec`(`id_aspirante`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_planeaciones_aneec` ADD CONSTRAINT `FK_dt_planeaciones_aneec_dt_diagnostico_aneec` FOREIGN KEY (`dt_diagnostico_id`) REFERENCES `dt_diagnostico_aneec`(`id_diagnostico`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_proyecto_anual` ADD CONSTRAINT `fk_proyecto_anual_techo_presupuestal` FOREIGN KEY (`dt_techo_id`) REFERENCES `dt_techo_presupuesto`(`id_techo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dt_techo_presupuesto` ADD CONSTRAINT `fk_techo_area` FOREIGN KEY (`ct_area_id`) REFERENCES `rl_area_financiero`(`id_area_fin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dt_techo_presupuesto` ADD CONSTRAINT `fk_techo_capitulo` FOREIGN KEY (`ct_capitulo_id`) REFERENCES `ct_capitulo`(`id_capitulo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_techo_presupuesto` ADD CONSTRAINT `fk_techo_financiamiento` FOREIGN KEY (`ct_financiamiento_id`) REFERENCES `ct_financiamiento`(`id_financiamiento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_techo_presupuesto` ADD CONSTRAINT `fk_techo_usuario_at` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_techo_presupuesto` ADD CONSTRAINT `fk_techo_usuario_in` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_analista_unidad` ADD CONSTRAINT `FK_rl_analista_unidad_ct_usuario` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_analista_unidad` ADD CONSTRAINT `FK_rl_analista_unidad_ct_usuario_2` FOREIGN KEY (`ct_usuario_id`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_analista_unidad` ADD CONSTRAINT `FK_rl_analista_unidad_rl_area_financiero` FOREIGN KEY (`rl_area_financiero`) REFERENCES `rl_area_financiero`(`id_area_fin`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_area_financiero` ADD CONSTRAINT `fk_area_fin_usuario_at` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_area_financiero` ADD CONSTRAINT `fk_area_fin_usuario_in` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_correspondencia_usuario_estado` ADD CONSTRAINT `fk_rl_corresp_corresp` FOREIGN KEY (`id_correspondencia`) REFERENCES `dt_correspondencia`(`id_correspondencia`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_correspondencia_usuario_estado` ADD CONSTRAINT `fk_rl_corresp_estado` FOREIGN KEY (`id_estado`) REFERENCES `ct_correspondencia_estado`(`id_estado`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_correspondencia_usuario_estado` ADD CONSTRAINT `fk_rl_corresp_usuario_crea` FOREIGN KEY (`id_usuario_crea`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_correspondencia_usuario_estado` ADD CONSTRAINT `fk_rl_corresp_usuario_puesto` FOREIGN KEY (`id_usuario_puesto`) REFERENCES `rl_usuario_puesto`(`id_usuario_puesto`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_entrega_formato` ADD CONSTRAINT `fk_rl_entrega_formato_ct_usuario` FOREIGN KEY (`ct_usuario_id`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_justificacion` ADD CONSTRAINT `FK_rl_justificacion_dt_techo_presupuesto` FOREIGN KEY (`dt_techo_id`) REFERENCES `dt_techo_presupuesto`(`id_techo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_justificacion` ADD CONSTRAINT `FK_rl_justificacion_rl_area_financiero` FOREIGN KEY (`ct_area_id`) REFERENCES `rl_area_financiero`(`id_area_fin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rl_justificacion` ADD CONSTRAINT `fk_justificacion_partida` FOREIGN KEY (`ct_partida_id`) REFERENCES `ct_partida`(`id_partida`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rl_justificacion` ADD CONSTRAINT `fk_justificacion_usuario` FOREIGN KEY (`ct_usuario_id`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rl_partida_area` ADD CONSTRAINT `FK_rl_partida_area_ct_partida` FOREIGN KEY (`id_partida`) REFERENCES `ct_partida`(`id_partida`) ON DELETE NO ACTION ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_partida_area` ADD CONSTRAINT `FK_rl_partida_area_rl_area_financiero` FOREIGN KEY (`id_area_infra`) REFERENCES `rl_area_financiero`(`id_area_fin`) ON DELETE NO ACTION ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_producto_area` ADD CONSTRAINT `FK_rl_producto_area_ct_producto_consumible` FOREIGN KEY (`id_producto`) REFERENCES `ct_producto_consumible`(`id_producto`) ON DELETE NO ACTION ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_producto_area` ADD CONSTRAINT `FK_rl_producto_area_rl_area_financiero` FOREIGN KEY (`id_area_infra`) REFERENCES `rl_area_financiero`(`id_area_fin`) ON DELETE NO ACTION ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_producto_requisicion` ADD CONSTRAINT `FK__ct_area` FOREIGN KEY (`ct_area_id`) REFERENCES `rl_area_financiero`(`id_area_fin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rl_producto_requisicion` ADD CONSTRAINT `FK__ct_producto_consumible` FOREIGN KEY (`ct_productos_id`) REFERENCES `ct_producto_consumible`(`id_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_producto_requisicion` ADD CONSTRAINT `FK__ct_usuario` FOREIGN KEY (`ct_usuarios_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_producto_requisicion` ADD CONSTRAINT `FK_rl_producto_requisicion_dt_techo_presupuesto` FOREIGN KEY (`dt_techo_id`) REFERENCES `dt_techo_presupuesto`(`id_techo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_puesto_funcion` ADD CONSTRAINT `fk_rl_puesto_funcion_actualizado_por` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_puesto_funcion` ADD CONSTRAINT `fk_rl_puesto_funcion_creado_por` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_puesto_funcion` ADD CONSTRAINT `fk_rl_puesto_funcion_funcion` FOREIGN KEY (`dt_funcion_id`) REFERENCES `dt_funcion`(`id_funcion`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_puesto_funcion` ADD CONSTRAINT `fk_rl_puesto_funcion_puesto` FOREIGN KEY (`ct_puesto_id`) REFERENCES `ct_puesto`(`id_puesto`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_usuario_funcion` ADD CONSTRAINT `fk_rl_usuario_funcion_actualizado_por` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_usuario_funcion` ADD CONSTRAINT `fk_rl_usuario_funcion_creado_por` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_usuario_funcion` ADD CONSTRAINT `fk_rl_usuario_funcion_funcion` FOREIGN KEY (`dt_funcion_id`) REFERENCES `dt_funcion`(`id_funcion`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_usuario_funcion` ADD CONSTRAINT `fk_rl_usuario_funcion_usuario` FOREIGN KEY (`ct_usuario_id`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_usuario_puesto` ADD CONSTRAINT `fk_rl_usuario_puesto_actualizado_por` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_usuario_puesto` ADD CONSTRAINT `fk_rl_usuario_puesto_creado_por` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_usuario_puesto` ADD CONSTRAINT `fk_rl_usuario_puesto_ct_puesto` FOREIGN KEY (`ct_puesto_id`) REFERENCES `ct_puesto`(`id_puesto`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_usuario_puesto` ADD CONSTRAINT `fk_rl_usuario_puesto_ct_usuario` FOREIGN KEY (`ct_usuario_id`) REFERENCES `ct_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;
