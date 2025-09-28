-- CreateTable
CREATE TABLE `ct_bitacora_accion` (
    `id_ct_bitacora_accion` INTEGER NOT NULL AUTO_INCREMENT,
    `accion` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `estado` BOOLEAN NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_ct_bitacora_accion_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_ct_bitacora_accion_ct_usuario_up`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_ct_bitacora_accion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_bitacora_entidad` (
    `id_ct_bitacora_entidad` INTEGER NOT NULL AUTO_INCREMENT,
    `entidad` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `estado` BOOLEAN NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_ct_bitacora_entidad_ct_usuario_in`(`id_ct_usuario_in`),
    INDEX `FK_ct_bitacora_entidad_ct_usuario_up`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_ct_bitacora_entidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_capitulo` (
    `id_ct_capitulo` INTEGER NOT NULL AUTO_INCREMENT,
    `clave_capitulo` INTEGER NOT NULL,
    `nombre_capitulo` VARCHAR(100) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_ct_capitulo_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_ct_capitulo_ct_usuario_2`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_ct_capitulo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_consumible_factura` (
    `id_ct_consumible_factura` INTEGER NOT NULL AUTO_INCREMENT,
    `factura` VARCHAR(255) NOT NULL,
    `id_ct_consumible_proveedor` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_ct_consumible_factura_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_ct_consumible_factura_ct_usuario_2`(`id_ct_usuario_up`),
    INDEX `FK_ct_facturas_ct_proveedor`(`id_ct_consumible_proveedor`),
    PRIMARY KEY (`id_ct_consumible_factura`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_consumible_proveedor` (
    `id_ct_consumible_proveedor` INTEGER NOT NULL AUTO_INCREMENT,
    `razon_social` VARCHAR(255) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` TIMESTAMP(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    UNIQUE INDEX `uk_razon_social`(`razon_social`(191)),
    INDEX `FK_ct_consumibles_proveedor_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_ct_consumibles_proveedor_ct_usuario_2`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_ct_consumible_proveedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_correspondencia_estado` (
    `id_ct_correspondencia_estado` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    UNIQUE INDEX `uk_corresp_estado_nombre`(`nombre`),
    INDEX `FK_ct_correspondencia_estado_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_ct_correspondencia_estado_ct_usuario_2`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_ct_correspondencia_estado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_correspondencia_formato_entrega` (
    `id_rl_entrega_formato` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    UNIQUE INDEX `uk_corresp_formato_nombre`(`nombre`),
    INDEX `FK_ct_correspondencia_formato_entrega_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_ct_correspondencia_formato_entrega_ct_usuario_2`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_rl_entrega_formato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_correspondencia_prioridad` (
    `id_ct_correspondencia_prioridad` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    UNIQUE INDEX `uk_corresp_prioridad_nombre`(`nombre`),
    INDEX `FK_ct_correspondencia_prioridad_ct_usuario_in`(`id_ct_usuario_in`),
    INDEX `FK_ct_correspondencia_prioridad_ct_usuario_up`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_ct_correspondencia_prioridad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_dispositivo` (
    `id_ct_dispositivo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_dispositivo` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `estado` BOOLEAN NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    UNIQUE INDEX `nombre_dispositivo_UNIQUE`(`nombre_dispositivo`),
    INDEX `FK_ct_dispositivo_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_ct_dispositivo_ct_usuario_2`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_ct_dispositivo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_documento_aneec` (
    `id_ct_documento_aneec` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NULL,
    `estado` BOOLEAN NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_ct_documentos_aneec_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_ct_documentos_aneec_ct_usuario_2`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_ct_documento_aneec`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_financiamiento` (
    `id_ct_financiamiento` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_financiamiento` VARCHAR(50) NOT NULL DEFAULT '0',
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_ct_financiamiento_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_ct_financiamiento_ct_usuario_2`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_ct_financiamiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_modulo` (
    `id_ct_modulo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_modulo` VARCHAR(100) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `fk_ct_modulo_actualizado_por`(`id_ct_usuario_up`),
    INDEX `fk_ct_modulo_creado_por`(`id_ct_usuario_in`),
    PRIMARY KEY (`id_ct_modulo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_partida` (
    `id_ct_partida` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ct_capitulo` INTEGER NOT NULL,
    `clave_partida` VARCHAR(10) NOT NULL,
    `nombre_partida` VARCHAR(255) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_ct_partida_ct_capitulo`(`id_ct_capitulo`),
    INDEX `FK_ct_partida_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_ct_partida_ct_usuario_2`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_ct_partida`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_producto_consumible` (
    `id_ct_producto_consumible` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ct_partida` INTEGER NOT NULL DEFAULT 0,
    `nombre_producto` VARCHAR(500) NOT NULL,
    `precio` DECIMAL(20, 2) NOT NULL DEFAULT 0.00,
    `id_ct_unidad_medida` INTEGER NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL DEFAULT 1,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `fk_ct_producto_consumible_actualizado_por`(`id_ct_usuario_up`),
    INDEX `fk_ct_producto_consumible_creado_por`(`id_ct_usuario_in`),
    INDEX `fk_ct_producto_consumible_ct_partida`(`id_ct_partida`),
    INDEX `fk_ct_producto_consumible_unidad`(`id_ct_unidad_medida`),
    PRIMARY KEY (`id_ct_producto_consumible`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_puesto` (
    `id_ct_puesto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id_ct_usuario_in` INTEGER NOT NULL DEFAULT 1,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `fk_puesto_usuario_crea`(`id_ct_usuario_in`),
    INDEX `fk_puesto_usuario_modifica`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_ct_puesto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_rate_limit` (
    `id_rate_limit` VARCHAR(36) NOT NULL,
    `identificador` VARCHAR(255) NOT NULL,
    `endpoint` VARCHAR(100) NOT NULL,
    `intentos` INTEGER NOT NULL DEFAULT 1,
    `ventana_inicio` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `bloqueado_hasta` DATETIME(6) NULL,

    INDEX `ct_rate_limit_bloqueado_hasta_idx`(`bloqueado_hasta`),
    INDEX `ct_rate_limit_identificador_endpoint_idx`(`identificador`, `endpoint`),
    INDEX `ct_rate_limit_ventana_inicio_idx`(`ventana_inicio`),
    PRIMARY KEY (`id_rate_limit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_refresh_token` (
    `id_token` VARCHAR(36) NOT NULL,
    `id_ct_usuario` INTEGER NOT NULL,
    `token_hash` VARCHAR(255) NOT NULL,
    `id_sesion` VARCHAR(36) NULL,
    `fecha_creacion` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `fecha_expiracion` DATETIME(6) NOT NULL,
    `fecha_uso` DATETIME(6) NULL,
    `usado` BOOLEAN NOT NULL DEFAULT false,
    `revocado` BOOLEAN NOT NULL DEFAULT false,
    `motivo_revocacion` VARCHAR(100) NULL,

    UNIQUE INDEX `ct_refresh_token_token_hash_key`(`token_hash`),
    INDEX `ct_refresh_token_fecha_expiracion_idx`(`fecha_expiracion`),
    INDEX `ct_refresh_token_id_usuario_idx`(`id_ct_usuario`),
    INDEX `ct_refresh_token_revocado_idx`(`revocado`),
    INDEX `ct_refresh_token_token_hash_idx`(`token_hash`),
    INDEX `ct_refresh_token_usado_idx`(`usado`),
    PRIMARY KEY (`id_token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_sesion` (
    `id_sesion` VARCHAR(36) NOT NULL,
    `id_ct_usuario` INTEGER NOT NULL,
    `jti` VARCHAR(36) NOT NULL,
    `ip_origen` VARCHAR(45) NULL,
    `user_agent` VARCHAR(500) NULL,
    `dispositivo` VARCHAR(100) NULL,
    `ubicacion` VARCHAR(100) NULL,
    `fecha_creacion` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `fecha_expiracion` DATETIME(6) NOT NULL,
    `fecha_ultimo_uso` DATETIME(6) NULL,
    `activa` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `ct_sesion_jti_key`(`jti`),
    INDEX `FK_ct_sesion_ct_usuario`(`id_ct_usuario`),
    INDEX `ct_sesion_activa_idx`(`activa`),
    INDEX `ct_sesion_fecha_expiracion_idx`(`fecha_expiracion`),
    INDEX `ct_sesion_jti_idx`(`jti`),
    PRIMARY KEY (`id_sesion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_unidad_medida` (
    `id_ct_unidad_medida` INTEGER NOT NULL AUTO_INCREMENT,
    `clave_unidad` VARCHAR(4) NULL,
    `nombre_unidad` VARCHAR(100) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_ct_unidad_medida_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_ct_unidad_medida_ct_usuario_2`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_ct_unidad_medida`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_usuario` (
    `id_ct_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_usuario` VARCHAR(255) NOT NULL,
    `contrasena` VARCHAR(255) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `id_dt_rupeet_informacion` INTEGER NULL,
    `uuid_usuario` VARCHAR(36) NOT NULL,
    `email` VARCHAR(255) NULL,
    `ultimo_login` DATETIME(0) NULL,
    `intento_fallidos` INTEGER NOT NULL DEFAULT 0,
    `bloqueado_hasta` DATETIME(0) NULL,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NULL,
    `id_ct_usuario_up` INTEGER NULL,

    UNIQUE INDEX `nombre_usuario_UNIQUE`(`nombre_usuario`),
    INDEX `fk_ct_usuario_actualizado_por`(`id_ct_usuario_up`),
    INDEX `fk_ct_usuario_creado_por`(`id_ct_usuario_in`),
    PRIMARY KEY (`id_ct_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_aspirante_aneec` (
    `id_dt_aspirante_aneec` INTEGER NOT NULL AUTO_INCREMENT,
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
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `fk_ct_municipio_id`(`ct_municipio_id`),
    INDEX `fk_dt_aspirante_aneec_actualizado_por`(`id_ct_usuario_up`),
    INDEX `fk_dt_aspirante_aneec_creado_por`(`id_ct_usuario_in`),
    PRIMARY KEY (`id_dt_aspirante_aneec`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_bitacora_movimiento` (
    `id_dt_bitacora_movimiento` BIGINT NOT NULL AUTO_INCREMENT,
    `id_ct_bitacora_accion` INTEGER NOT NULL,
    `id_ct_bitacora_entidad` INTEGER NOT NULL,
    `id_registro_afectado` BIGINT NULL,
    `id_ct_usuario` INTEGER NULL,
    `ip_origen` VARCHAR(45) NOT NULL,
    `id_ct_dispositivo` INTEGER NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `datos_anteriores` LONGTEXT NULL,
    `datos_nuevos` LONGTEXT NULL,
    `fecha_in` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id_ct_bitacora_accion`(`id_ct_bitacora_accion`),
    INDEX `id_ct_bitacora_entidad`(`id_ct_bitacora_entidad`),
    INDEX `id_ct_dispositivo`(`id_ct_dispositivo`),
    INDEX `id_ct_usuario`(`id_ct_usuario`),
    PRIMARY KEY (`id_dt_bitacora_movimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_consumible_entrega` (
    `id_dt_consumible_entrega` INTEGER NOT NULL AUTO_INCREMENT,
    `folio` VARCHAR(15) NOT NULL,
    `ct_area_id` INTEGER NOT NULL,
    `id_dt_consumible_inventario` INTEGER NOT NULL,
    `id_ct_unidad_medida` INTEGER NOT NULL,
    `id_rl_entrega_formato` INTEGER NULL,
    `cantidad` DECIMAL(10, 2) NOT NULL,
    `observaciones` VARCHAR(255) NOT NULL DEFAULT '',
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_dt_consumible_entrega_ct_usuario_2`(`id_ct_usuario_up`),
    INDEX `ct_area_id`(`ct_area_id`),
    INDEX `ct_unidad_id`(`id_ct_unidad_medida`),
    INDEX `ct_usuario_id`(`id_ct_usuario_in`),
    INDEX `dt_inventario_id`(`id_dt_consumible_inventario`),
    INDEX `fk_dt_consumible_entrega_formato_idx`(`id_rl_entrega_formato`),
    PRIMARY KEY (`id_dt_consumible_entrega`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_consumible_inventario` (
    `id_dt_consumible_inventario` INTEGER NOT NULL AUTO_INCREMENT,
    `folio` VARCHAR(20) NOT NULL,
    `descripcion` TEXT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 0,
    `resta` INTEGER NOT NULL DEFAULT 0,
    `id_ct_partida` INTEGER NOT NULL,
    `id_ct_unidad_medida` INTEGER NOT NULL,
    `id_ct_consumible_factura` INTEGER NOT NULL,
    `observaciones` VARCHAR(255) NOT NULL DEFAULT '',
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL DEFAULT 0,
    `id_ct_usuario_up` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `folio`(`folio`),
    INDEX `FK_dt_consumible_inventario_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_dt_consumible_inventario_ct_usuario_2`(`id_ct_usuario_up`),
    INDEX `ct_factura_id`(`id_ct_consumible_factura`),
    INDEX `ct_partida_id`(`id_ct_partida`),
    INDEX `ct_unidad_id`(`id_ct_unidad_medida`),
    PRIMARY KEY (`id_dt_consumible_inventario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_correspondencia` (
    `id_dt_correspondencia` INTEGER NOT NULL AUTO_INCREMENT,
    `asunto` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NULL,
    `remitente` VARCHAR(255) NOT NULL,
    `destinatario` VARCHAR(255) NOT NULL,
    `id_ct_correspondencia_prioridad` INTEGER NOT NULL,
    `id_tipo` INTEGER NOT NULL,
    `id_rl_entrega_formato` INTEGER NOT NULL,
    `folio` VARCHAR(100) NULL,
    `fecha_documento` DATE NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `fk_corresp_formato`(`id_rl_entrega_formato`),
    INDEX `fk_corresp_prioridad`(`id_ct_correspondencia_prioridad`),
    INDEX `fk_corresp_tipo`(`id_tipo`),
    INDEX `fk_corresp_usuario_crea`(`id_ct_usuario_in`),
    INDEX `fk_corresp_usuario_modifica`(`id_ct_usuario_up`),
    PRIMARY KEY (`id_dt_correspondencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_diagnostico_aneec` (
    `id_dt_diagnostico_aneec` INTEGER NOT NULL AUTO_INCREMENT,
    `curp` VARCHAR(18) NOT NULL,
    `nombreCompleto` VARCHAR(100) NOT NULL,
    `ct_municipio_id` INTEGER NOT NULL,
    `tipo_necesidad` VARCHAR(100) NOT NULL,
    `rehabilitacion_fisica` ENUM('S', 'N') NOT NULL,
    `ruta_diagnostico` VARCHAR(50) NOT NULL,
    `id_dt_aspirante_aneec` INTEGER NOT NULL,
    `ruta_INE_tutor` VARCHAR(50) NOT NULL,
    `ruta_acta_nacimiento_usuario` VARCHAR(50) NOT NULL,
    `ruta_comprobante_domicilio` VARCHAR(50) NOT NULL,
    `ruta_privacidad_usuario` VARCHAR(50) NOT NULL,
    `ruta_carta_compromiso_usuario` VARCHAR(50) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `fk_ct_municipio_id_dt_diagnostico_aneec`(`ct_municipio_id`),
    INDEX `fk_dt_aspirante_id`(`id_dt_aspirante_aneec`),
    INDEX `fk_dt_diagnostico_aneec_actualizado_por`(`id_ct_usuario_up`),
    INDEX `fk_dt_diagnostico_aneec_creado_por`(`id_ct_usuario_in`),
    PRIMARY KEY (`id_dt_diagnostico_aneec`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_funcion` (
    `id_dt_funcion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ct_modulo` INTEGER NULL,
    `nombre_funcion` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `fk_dt_funcion_actualizado_por`(`id_ct_usuario_up`),
    INDEX `fk_dt_funcion_creado_por`(`id_ct_usuario_in`),
    INDEX `fk_dt_funcion_ct_modulo`(`id_ct_modulo`),
    PRIMARY KEY (`id_dt_funcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_informes_aneec` (
    `id_dt_informes_aneec` INTEGER NOT NULL AUTO_INCREMENT,
    `ruta_informe` VARCHAR(50) NOT NULL,
    `id_dt_aspirante_aneec` INTEGER NOT NULL,
    `id_dt_diagnostico_aneec` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `fk_dt_aspirante_id_dt_informes_aneec`(`id_dt_aspirante_aneec`),
    INDEX `fk_dt_diagnostico_id_dt_informes_aneec`(`id_dt_diagnostico_aneec`),
    INDEX `fk_dt_informes_annec_actualizado_por`(`id_ct_usuario_up`),
    INDEX `fk_dt_informes_annec_creado_por`(`id_ct_usuario_in`),
    PRIMARY KEY (`id_dt_informes_aneec`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_planeaciones_aneec` (
    `id_dt_planeaciones_aneec` INTEGER NOT NULL AUTO_INCREMENT,
    `ruta_documento` VARCHAR(50) NOT NULL,
    `id_ct_documento_aneec` INTEGER NOT NULL,
    `id_dt_aspirante_aneec` INTEGER NOT NULL,
    `id_dt_diagnostico_aneec` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_dt_planeaciones_aneec__actualizado_por`(`id_ct_usuario_up`),
    INDEX `FK_dt_planeaciones_aneec_ct_documentos_aneec`(`id_ct_documento_aneec`),
    INDEX `FK_dt_planeaciones_aneec_ct_usuario_creado_por`(`id_ct_usuario_in`),
    INDEX `FK_dt_planeaciones_aneec_dt_aspirante_aneec`(`id_dt_aspirante_aneec`),
    INDEX `FK_dt_planeaciones_aneec_dt_diagnostico_aneec`(`id_dt_diagnostico_aneec`),
    PRIMARY KEY (`id_dt_planeaciones_aneec`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_proyecto_anual` (
    `id_dt_proyecto_anual` INTEGER NOT NULL AUTO_INCREMENT,
    `año` INTEGER NOT NULL,
    `id_dt_techo_presupuesto` INTEGER NOT NULL,
    `monto_asignado` DECIMAL(15, 3) NOT NULL DEFAULT 0.000,
    `monto_utilizado` DECIMAL(15, 3) NOT NULL DEFAULT 0.000,
    `monto_disponible` DECIMAL(15, 3) NOT NULL DEFAULT 0.000,
    `descripcion` VARCHAR(255) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_dt_proyecto_anual_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_dt_proyecto_anual_ct_usuario_2`(`id_ct_usuario_up`),
    INDEX `fk_proyecto_anual_techo_presupuestal_idx`(`id_dt_techo_presupuesto`),
    INDEX `idx_proyecto_anual_año`(`año`),
    PRIMARY KEY (`id_dt_proyecto_anual`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_techo_presupuesto` (
    `id_dt_techo_presupuesto` INTEGER NOT NULL AUTO_INCREMENT,
    `id_rl_area_financiero` INTEGER NOT NULL DEFAULT 0,
    `id_ct_capitulo` INTEGER NOT NULL DEFAULT 0,
    `id_ct_financiamiento` INTEGER NOT NULL DEFAULT 0,
    `cantidad_presupuestada` DECIMAL(15, 3) NOT NULL DEFAULT 0.000,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL DEFAULT 1,
    `id_ct_usuario_up` INTEGER NULL DEFAULT 0,

    INDEX `fk_techo_area_idx`(`id_rl_area_financiero`),
    INDEX `fk_techo_capitulo`(`id_ct_capitulo`),
    INDEX `fk_techo_financiamiento`(`id_ct_financiamiento`),
    INDEX `fk_techo_usuario_at`(`id_ct_usuario_up`),
    INDEX `fk_techo_usuario_in`(`id_ct_usuario_in`),
    PRIMARY KEY (`id_dt_techo_presupuesto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_analista_unidad` (
    `id_rl_analista_unidad` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_usuario_id` INTEGER NOT NULL DEFAULT 0,
    `rl_area_financiero` INTEGER NOT NULL DEFAULT 1,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL DEFAULT 1,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_rl_analista_unidad_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_rl_analista_unidad_ct_usuario_2`(`ct_usuario_id`),
    INDEX `FK_rl_analista_unidad_ct_usuario_3`(`id_ct_usuario_up`),
    INDEX `fk_ct_area_id_area`(`rl_area_financiero`),
    PRIMARY KEY (`id_rl_analista_unidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_area_financiero` (
    `id_rl_area_financiero` INTEGER NOT NULL AUTO_INCREMENT,
    `id_financiero` INTEGER NOT NULL DEFAULT 0,
    `id_area_infra` INTEGER NOT NULL DEFAULT 0,
    `estado` BOOLEAN NULL,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `fk_area_fin_usuario_at`(`id_ct_usuario_up`),
    INDEX `fk_area_fin_usuario_in`(`id_ct_usuario_in`),
    INDEX `idx_id_area_infra`(`id_area_infra`),
    PRIMARY KEY (`id_rl_area_financiero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_correspondencia_usuario_estado` (
    `id_rl_correspondencia_usuario_estado` INTEGER NOT NULL AUTO_INCREMENT,
    `id_dt_correspondencia` INTEGER NOT NULL,
    `id_rl_usuario_puesto` INTEGER NOT NULL,
    `id_ct_correspondencia_estado` INTEGER NOT NULL,
    `tipo_turnado` ENUM('respuesta', 'consulta') NOT NULL DEFAULT 'respuesta',
    `observaciones` VARCHAR(300) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_rl_correspondencia_usuario_estado_ct_usuario_2`(`id_ct_usuario_up`),
    INDEX `fk_rl_corresp_corresp`(`id_dt_correspondencia`),
    INDEX `fk_rl_corresp_estado`(`id_ct_correspondencia_estado`),
    INDEX `fk_rl_corresp_usuario_crea`(`id_ct_usuario_in`),
    INDEX `fk_rl_corresp_usuario_puesto`(`id_rl_usuario_puesto`),
    PRIMARY KEY (`id_rl_correspondencia_usuario_estado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_entrega_formato` (
    `id_rl_entrega_formato` INTEGER NOT NULL AUTO_INCREMENT,
    `folio_formato` VARCHAR(20) NOT NULL,
    `mes_cantidad` VARCHAR(100) NULL,
    `persona_recibe` VARCHAR(255) NULL,
    `estado` BOOLEAN NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    UNIQUE INDEX `folio_formato_UNIQUE`(`folio_formato`),
    INDEX `FK_rl_entrega_formato_ct_usuario_2`(`id_ct_usuario_up`),
    INDEX `fk_rl_entrega_formato_ct_usuario_idx`(`id_ct_usuario_in`),
    PRIMARY KEY (`id_rl_entrega_formato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_justificacion` (
    `id_rl_justificacion` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_partida_id` INTEGER NOT NULL,
    `ct_area_id` INTEGER NOT NULL,
    `dt_techo_id` INTEGER NULL DEFAULT 1,
    `justificacion` TEXT NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_rl_justificacion_ct_usuario_2`(`id_ct_usuario_up`),
    INDEX `FK_rl_justificacion_dt_techo_presupuesto`(`dt_techo_id`),
    INDEX `FK_rl_justificacion_rl_area_financiero`(`ct_area_id`),
    INDEX `idx_justificacion_area`(`ct_area_id`),
    INDEX `idx_justificacion_area_financiera`(`ct_area_id`),
    INDEX `idx_justificacion_partida`(`ct_partida_id`),
    INDEX `idx_justificacion_partida_area`(`ct_partida_id`, `ct_area_id`),
    INDEX `idx_justificacion_partida_area_financiera`(`ct_partida_id`, `ct_area_id`),
    INDEX `idx_justificacion_usuario`(`id_ct_usuario_in`),
    PRIMARY KEY (`id_rl_justificacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_partida_area` (
    `id_rl_partida_area` INTEGER NOT NULL AUTO_INCREMENT,
    `id_area_infra` INTEGER NOT NULL DEFAULT 0,
    `id_ct_partida` INTEGER NOT NULL DEFAULT 0,
    `estado` BOOLEAN NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_rl_partida_area_ct_partida`(`id_ct_partida`),
    INDEX `FK_rl_partida_area_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_rl_partida_area_ct_usuario_2`(`id_ct_usuario_up`),
    INDEX `FK_rl_partida_area_rl_area_financiero`(`id_area_infra`),
    PRIMARY KEY (`id_rl_partida_area`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_producto_area` (
    `id_rl_producto_area` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ct_producto_consumible` INTEGER NOT NULL,
    `id_area_infra` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK_rl_producto_area_ct_producto_consumible`(`id_ct_producto_consumible`),
    INDEX `FK_rl_producto_area_ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_rl_producto_area_ct_usuario_2`(`id_ct_usuario_up`),
    INDEX `FK_rl_producto_area_rl_area_financiero`(`id_area_infra`),
    PRIMARY KEY (`id_rl_producto_area`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_producto_requisicion` (
    `id_rl_producto_requisicion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_rl_area_financiero` INTEGER NOT NULL DEFAULT 0,
    `id_dt_techo_presupuesto` INTEGER NOT NULL DEFAULT 0,
    `id_ct_producto_consumible` INTEGER NOT NULL DEFAULT 0,
    `cantidad` DECIMAL(10, 3) NOT NULL DEFAULT 0.000,
    `mes` VARCHAR(2) NOT NULL DEFAULT '0',
    `total` DECIMAL(15, 3) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `FK__ct_area_idx`(`id_rl_area_financiero`),
    INDEX `FK__ct_producto_consumible`(`id_ct_producto_consumible`),
    INDEX `FK__ct_usuario`(`id_ct_usuario_in`),
    INDEX `FK_rl_producto_requisicion_ct_usuario_2`(`id_ct_usuario_up`),
    INDEX `FK_rl_producto_requisicion_dt_techo_presupuesto`(`id_dt_techo_presupuesto`),
    PRIMARY KEY (`id_rl_producto_requisicion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_puesto_funcion` (
    `id_rl_puesto_funcion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ct_puesto` INTEGER NULL,
    `id_dt_funcion` INTEGER NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `id_ct_usuario_in` INTEGER NOT NULL,
    `id_ct_usuario_up` INTEGER NULL,

    INDEX `fk_rl_puesto_funcion_actualizado_por`(`id_ct_usuario_up`),
    INDEX `fk_rl_puesto_funcion_creado_por`(`id_ct_usuario_in`),
    INDEX `fk_rl_puesto_funcion_funcion`(`id_dt_funcion`),
    INDEX `fk_rl_puesto_funcion_puesto`(`id_ct_puesto`),
    PRIMARY KEY (`id_rl_puesto_funcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_usuario_funcion` (
    `id_rl_usuario_funcion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ct_usuario` INTEGER NULL,
    `id_dt_funcion` INTEGER NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `ct_usuario_in` INTEGER NOT NULL,
    `ct_usuario_at` INTEGER NULL,

    INDEX `fk_rl_usuario_funcion_actualizado_por`(`ct_usuario_at`),
    INDEX `fk_rl_usuario_funcion_creado_por`(`ct_usuario_in`),
    INDEX `fk_rl_usuario_funcion_funcion`(`id_dt_funcion`),
    INDEX `fk_rl_usuario_funcion_usuario`(`id_ct_usuario`),
    PRIMARY KEY (`id_rl_usuario_funcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rl_usuario_puesto` (
    `id_rl_usuario_puesto` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ct_usuario` INTEGER NOT NULL,
    `id_ct_puesto` INTEGER NOT NULL,
    `id_area` INTEGER NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_in` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_up` DATETIME(0) NULL,
    `ct_usuario_in` INTEGER NOT NULL,
    `ct_usuario_at` INTEGER NULL,

    INDEX `fk_rl_usuario_puesto_actualizado_por`(`ct_usuario_at`),
    INDEX `fk_rl_usuario_puesto_creado_por`(`ct_usuario_in`),
    INDEX `fk_rl_usuario_puesto_ct_puesto`(`id_ct_puesto`),
    INDEX `fk_rl_usuario_puesto_ct_usuario`(`id_ct_usuario`),
    PRIMARY KEY (`id_rl_usuario_puesto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ct_bitacora_accion` ADD CONSTRAINT `FK_ct_bitacora_accion_ct_usuario_in` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_bitacora_accion` ADD CONSTRAINT `FK_ct_bitacora_accion_ct_usuario_up` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_bitacora_entidad` ADD CONSTRAINT `FK_ct_bitacora_entidad_ct_usuario_in` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_bitacora_entidad` ADD CONSTRAINT `FK_ct_bitacora_entidad_ct_usuario_up` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_capitulo` ADD CONSTRAINT `FK_ct_capitulo_ct_usuario_in` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_capitulo` ADD CONSTRAINT `FK_ct_capitulo_ct_usuario_up` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_consumible_factura` ADD CONSTRAINT `FK_ct_consumible_factura_ct_consumible_proveedor` FOREIGN KEY (`id_ct_consumible_proveedor`) REFERENCES `ct_consumible_proveedor`(`id_ct_consumible_proveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_consumible_factura` ADD CONSTRAINT `FK_ct_consumible_factura_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_consumible_factura` ADD CONSTRAINT `FK_ct_consumible_factura_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_consumible_proveedor` ADD CONSTRAINT `FK_ct_consumibles_proveedor_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_consumible_proveedor` ADD CONSTRAINT `FK_ct_consumibles_proveedor_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_correspondencia_estado` ADD CONSTRAINT `FK_ct_correspondencia_estado_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_correspondencia_estado` ADD CONSTRAINT `FK_ct_correspondencia_estado_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_correspondencia_formato_entrega` ADD CONSTRAINT `FK_ct_correspondencia_formato_entrega_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_correspondencia_formato_entrega` ADD CONSTRAINT `FK_ct_correspondencia_formato_entrega_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_correspondencia_prioridad` ADD CONSTRAINT `FK_ct_correspondencia_prioridad_ct_usuario_in` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_correspondencia_prioridad` ADD CONSTRAINT `FK_ct_correspondencia_prioridad_ct_usuario_up` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_dispositivo` ADD CONSTRAINT `FK_ct_dispositivo_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_dispositivo` ADD CONSTRAINT `FK_ct_dispositivo_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_documento_aneec` ADD CONSTRAINT `FK_ct_documentos_aneec_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_documento_aneec` ADD CONSTRAINT `FK_ct_documentos_aneec_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_financiamiento` ADD CONSTRAINT `FK_ct_financiamiento_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_financiamiento` ADD CONSTRAINT `FK_ct_financiamiento_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_modulo` ADD CONSTRAINT `FK_ct_modulo_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_modulo` ADD CONSTRAINT `FK_ct_modulo_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_partida` ADD CONSTRAINT `FK_ct_partida_ct_capitulo` FOREIGN KEY (`id_ct_capitulo`) REFERENCES `ct_capitulo`(`id_ct_capitulo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_partida` ADD CONSTRAINT `FK_ct_partida_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_partida` ADD CONSTRAINT `FK_ct_partida_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_producto_consumible` ADD CONSTRAINT `FK_ct_producto_consumible_ct_partida` FOREIGN KEY (`id_ct_partida`) REFERENCES `ct_partida`(`id_ct_partida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_producto_consumible` ADD CONSTRAINT `FK_ct_producto_consumible_ct_unidad_medida` FOREIGN KEY (`id_ct_unidad_medida`) REFERENCES `ct_unidad_medida`(`id_ct_unidad_medida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_producto_consumible` ADD CONSTRAINT `FK_ct_producto_consumible_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_producto_consumible` ADD CONSTRAINT `FK_ct_producto_consumible_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_puesto` ADD CONSTRAINT `FK_ct_puesto_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_puesto` ADD CONSTRAINT `FK_ct_puesto_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_refresh_token` ADD CONSTRAINT `FK_ct_refresh_token_ct_usuario` FOREIGN KEY (`id_ct_usuario`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_sesion` ADD CONSTRAINT `FK_ct_sesion_ct_usuario` FOREIGN KEY (`id_ct_usuario`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_unidad_medida` ADD CONSTRAINT `FK_ct_unidad_medida_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_unidad_medida` ADD CONSTRAINT `FK_ct_unidad_medida_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_usuario` ADD CONSTRAINT `FK_ct_usuario_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ct_usuario` ADD CONSTRAINT `FK_ct_usuario_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_aspirante_aneec` ADD CONSTRAINT `FK_dt_aspirante_aneec_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_aspirante_aneec` ADD CONSTRAINT `FK_dt_aspirante_aneec_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_bitacora_movimiento` ADD CONSTRAINT `dt_bitacora_movimiento_ibfk_1` FOREIGN KEY (`id_ct_bitacora_accion`) REFERENCES `ct_bitacora_accion`(`id_ct_bitacora_accion`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_bitacora_movimiento` ADD CONSTRAINT `dt_bitacora_movimiento_ibfk_2` FOREIGN KEY (`id_ct_bitacora_entidad`) REFERENCES `ct_bitacora_entidad`(`id_ct_bitacora_entidad`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_bitacora_movimiento` ADD CONSTRAINT `dt_bitacora_movimiento_ibfk_3` FOREIGN KEY (`id_ct_usuario`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_bitacora_movimiento` ADD CONSTRAINT `dt_bitacora_movimiento_ibfk_4` FOREIGN KEY (`id_ct_dispositivo`) REFERENCES `ct_dispositivo`(`id_ct_dispositivo`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_consumible_entrega` ADD CONSTRAINT `FK_dt_consumible_entrega_ct_unidad_medida` FOREIGN KEY (`id_ct_unidad_medida`) REFERENCES `ct_unidad_medida`(`id_ct_unidad_medida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_entrega` ADD CONSTRAINT `FK_dt_consumible_entrega_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_entrega` ADD CONSTRAINT `FK_dt_consumible_entrega_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_entrega` ADD CONSTRAINT `FK_dt_consumible_entrega_dt_consumible_inventario` FOREIGN KEY (`id_dt_consumible_inventario`) REFERENCES `dt_consumible_inventario`(`id_dt_consumible_inventario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_entrega` ADD CONSTRAINT `FK_dt_consumible_entrega_rl_entrega_formato` FOREIGN KEY (`id_rl_entrega_formato`) REFERENCES `rl_entrega_formato`(`id_rl_entrega_formato`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_inventario` ADD CONSTRAINT `FK_dt_consumible_inventario_ct_consumible_factura` FOREIGN KEY (`id_ct_consumible_factura`) REFERENCES `ct_consumible_factura`(`id_ct_consumible_factura`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_inventario` ADD CONSTRAINT `FK_dt_consumible_inventario_ct_partida` FOREIGN KEY (`id_ct_partida`) REFERENCES `ct_partida`(`id_ct_partida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_inventario` ADD CONSTRAINT `FK_dt_consumible_inventario_ct_unidad_medida` FOREIGN KEY (`id_ct_unidad_medida`) REFERENCES `ct_unidad_medida`(`id_ct_unidad_medida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_inventario` ADD CONSTRAINT `FK_dt_consumible_inventario_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_consumible_inventario` ADD CONSTRAINT `FK_dt_consumible_inventario_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_correspondencia` ADD CONSTRAINT `FK_dt_correspondencia_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_correspondencia` ADD CONSTRAINT `FK_dt_correspondencia_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_correspondencia` ADD CONSTRAINT `fk_corresp_formato` FOREIGN KEY (`id_rl_entrega_formato`) REFERENCES `ct_correspondencia_formato_entrega`(`id_rl_entrega_formato`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_correspondencia` ADD CONSTRAINT `fk_corresp_prioridad` FOREIGN KEY (`id_ct_correspondencia_prioridad`) REFERENCES `ct_correspondencia_prioridad`(`id_ct_correspondencia_prioridad`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_diagnostico_aneec` ADD CONSTRAINT `FK_dt_diagnostico_aneec_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_diagnostico_aneec` ADD CONSTRAINT `FK_dt_diagnostico_aneec_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_diagnostico_aneec` ADD CONSTRAINT `FK_dt_diagnostico_aneec_dt_aspirante_aneec` FOREIGN KEY (`id_dt_aspirante_aneec`) REFERENCES `dt_aspirante_aneec`(`id_dt_aspirante_aneec`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_funcion` ADD CONSTRAINT `FK_dt_funcion_ct_modulo` FOREIGN KEY (`id_ct_modulo`) REFERENCES `ct_modulo`(`id_ct_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_funcion` ADD CONSTRAINT `FK_dt_funcion_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_funcion` ADD CONSTRAINT `FK_dt_funcion_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_informes_aneec` ADD CONSTRAINT `FK_dt_informes_aneec_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_informes_aneec` ADD CONSTRAINT `FK_dt_informes_aneec_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_informes_aneec` ADD CONSTRAINT `FK_dt_informes_aneec_dt_aspirante_aneec` FOREIGN KEY (`id_dt_aspirante_aneec`) REFERENCES `dt_aspirante_aneec`(`id_dt_aspirante_aneec`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_informes_aneec` ADD CONSTRAINT `FK_dt_informes_aneec_dt_diagnostico_aneec` FOREIGN KEY (`id_dt_diagnostico_aneec`) REFERENCES `dt_diagnostico_aneec`(`id_dt_diagnostico_aneec`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_planeaciones_aneec` ADD CONSTRAINT `FK_dt_planeaciones_aneec_ct_documentos_aneec` FOREIGN KEY (`id_ct_documento_aneec`) REFERENCES `ct_documento_aneec`(`id_ct_documento_aneec`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dt_planeaciones_aneec` ADD CONSTRAINT `FK_dt_planeaciones_aneec_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_planeaciones_aneec` ADD CONSTRAINT `FK_dt_planeaciones_aneec_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_planeaciones_aneec` ADD CONSTRAINT `FK_dt_planeaciones_aneec_dt_aspirante_aneec` FOREIGN KEY (`id_dt_aspirante_aneec`) REFERENCES `dt_aspirante_aneec`(`id_dt_aspirante_aneec`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_planeaciones_aneec` ADD CONSTRAINT `FK_dt_planeaciones_aneec_dt_diagnostico_aneec` FOREIGN KEY (`id_dt_diagnostico_aneec`) REFERENCES `dt_diagnostico_aneec`(`id_dt_diagnostico_aneec`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_proyecto_anual` ADD CONSTRAINT `FK_dt_proyecto_anual_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_proyecto_anual` ADD CONSTRAINT `FK_dt_proyecto_anual_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_proyecto_anual` ADD CONSTRAINT `FK_dt_proyecto_anual_dt_techo_presupuesto` FOREIGN KEY (`id_dt_techo_presupuesto`) REFERENCES `dt_techo_presupuesto`(`id_dt_techo_presupuesto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_techo_presupuesto` ADD CONSTRAINT `FK_dt_techo_presupuesto_ct_capitulo` FOREIGN KEY (`id_ct_capitulo`) REFERENCES `ct_capitulo`(`id_ct_capitulo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_techo_presupuesto` ADD CONSTRAINT `FK_dt_techo_presupuesto_ct_financiamiento` FOREIGN KEY (`id_ct_financiamiento`) REFERENCES `ct_financiamiento`(`id_ct_financiamiento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_techo_presupuesto` ADD CONSTRAINT `FK_dt_techo_presupuesto_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_techo_presupuesto` ADD CONSTRAINT `FK_dt_techo_presupuesto_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dt_techo_presupuesto` ADD CONSTRAINT `FK_dt_techo_presupuesto_rl_area_financiero` FOREIGN KEY (`id_rl_area_financiero`) REFERENCES `rl_area_financiero`(`id_rl_area_financiero`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_analista_unidad` ADD CONSTRAINT `FK_rl_analista_unidad_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_analista_unidad` ADD CONSTRAINT `FK_rl_analista_unidad_ct_usuario_2` FOREIGN KEY (`ct_usuario_id`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_analista_unidad` ADD CONSTRAINT `FK_rl_analista_unidad_ct_usuario_3` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_analista_unidad` ADD CONSTRAINT `FK_rl_analista_unidad_rl_area_financiero` FOREIGN KEY (`rl_area_financiero`) REFERENCES `rl_area_financiero`(`id_rl_area_financiero`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_area_financiero` ADD CONSTRAINT `FK_rl_area_financiero_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_area_financiero` ADD CONSTRAINT `FK_rl_area_financiero_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_correspondencia_usuario_estado` ADD CONSTRAINT `FK_rl_correspondencia_usuario_estado_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_correspondencia_usuario_estado` ADD CONSTRAINT `FK_rl_correspondencia_usuario_estado_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_correspondencia_usuario_estado` ADD CONSTRAINT `fk_rl_corresp_corresp` FOREIGN KEY (`id_dt_correspondencia`) REFERENCES `dt_correspondencia`(`id_dt_correspondencia`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_correspondencia_usuario_estado` ADD CONSTRAINT `fk_rl_corresp_estado` FOREIGN KEY (`id_ct_correspondencia_estado`) REFERENCES `ct_correspondencia_estado`(`id_ct_correspondencia_estado`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_correspondencia_usuario_estado` ADD CONSTRAINT `fk_rl_corresp_usuario_puesto` FOREIGN KEY (`id_rl_usuario_puesto`) REFERENCES `rl_usuario_puesto`(`id_rl_usuario_puesto`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_entrega_formato` ADD CONSTRAINT `FK_rl_entrega_formato_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_entrega_formato` ADD CONSTRAINT `FK_rl_entrega_formato_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_justificacion` ADD CONSTRAINT `FK_rl_justificacion_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_justificacion` ADD CONSTRAINT `FK_rl_justificacion_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_justificacion` ADD CONSTRAINT `FK_rl_justificacion_dt_techo_presupuesto` FOREIGN KEY (`dt_techo_id`) REFERENCES `dt_techo_presupuesto`(`id_dt_techo_presupuesto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_justificacion` ADD CONSTRAINT `FK_rl_justificacion_rl_area_financiero` FOREIGN KEY (`ct_area_id`) REFERENCES `rl_area_financiero`(`id_rl_area_financiero`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rl_justificacion` ADD CONSTRAINT `fk_justificacion_partida` FOREIGN KEY (`ct_partida_id`) REFERENCES `ct_partida`(`id_ct_partida`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rl_partida_area` ADD CONSTRAINT `FK_rl_partida_area_ct_partida` FOREIGN KEY (`id_ct_partida`) REFERENCES `ct_partida`(`id_ct_partida`) ON DELETE NO ACTION ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_partida_area` ADD CONSTRAINT `FK_rl_partida_area_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_partida_area` ADD CONSTRAINT `FK_rl_partida_area_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_partida_area` ADD CONSTRAINT `FK_rl_partida_area_rl_area_financiero` FOREIGN KEY (`id_area_infra`) REFERENCES `rl_area_financiero`(`id_rl_area_financiero`) ON DELETE NO ACTION ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_producto_area` ADD CONSTRAINT `FK_rl_producto_area_ct_producto_consumible` FOREIGN KEY (`id_ct_producto_consumible`) REFERENCES `ct_producto_consumible`(`id_ct_producto_consumible`) ON DELETE NO ACTION ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_producto_area` ADD CONSTRAINT `FK_rl_producto_area_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_producto_area` ADD CONSTRAINT `FK_rl_producto_area_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_producto_area` ADD CONSTRAINT `FK_rl_producto_area_rl_area_financiero` FOREIGN KEY (`id_area_infra`) REFERENCES `rl_area_financiero`(`id_rl_area_financiero`) ON DELETE NO ACTION ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_producto_requisicion` ADD CONSTRAINT `FK_rl_producto_requisicion_ct_producto_consumible` FOREIGN KEY (`id_ct_producto_consumible`) REFERENCES `ct_producto_consumible`(`id_ct_producto_consumible`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_producto_requisicion` ADD CONSTRAINT `FK_rl_producto_requisicion_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_producto_requisicion` ADD CONSTRAINT `FK_rl_producto_requisicion_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_producto_requisicion` ADD CONSTRAINT `FK_rl_producto_requisicion_dt_techo_presupuesto` FOREIGN KEY (`id_dt_techo_presupuesto`) REFERENCES `dt_techo_presupuesto`(`id_dt_techo_presupuesto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_producto_requisicion` ADD CONSTRAINT `FK_rl_producto_requisicion_rl_area_financiero` FOREIGN KEY (`id_rl_area_financiero`) REFERENCES `rl_area_financiero`(`id_rl_area_financiero`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_puesto_funcion` ADD CONSTRAINT `FK_rl_puesto_funcion_ct_puesto` FOREIGN KEY (`id_ct_puesto`) REFERENCES `ct_puesto`(`id_ct_puesto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_puesto_funcion` ADD CONSTRAINT `FK_rl_puesto_funcion_ct_usuario` FOREIGN KEY (`id_ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_puesto_funcion` ADD CONSTRAINT `FK_rl_puesto_funcion_ct_usuario_2` FOREIGN KEY (`id_ct_usuario_up`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_puesto_funcion` ADD CONSTRAINT `FK_rl_puesto_funcion_dt_funcion` FOREIGN KEY (`id_dt_funcion`) REFERENCES `dt_funcion`(`id_dt_funcion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_usuario_funcion` ADD CONSTRAINT `FK_rl_usuario_funcion_ct_usuario` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_usuario_funcion` ADD CONSTRAINT `FK_rl_usuario_funcion_ct_usuario_2` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_usuario_funcion` ADD CONSTRAINT `FK_rl_usuario_funcion_ct_usuario_3` FOREIGN KEY (`id_ct_usuario`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_usuario_funcion` ADD CONSTRAINT `FK_rl_usuario_funcion_dt_funcion` FOREIGN KEY (`id_dt_funcion`) REFERENCES `dt_funcion`(`id_dt_funcion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_usuario_puesto` ADD CONSTRAINT `FK_rl_usuario_puesto_ct_puesto` FOREIGN KEY (`id_ct_puesto`) REFERENCES `ct_puesto`(`id_ct_puesto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_usuario_puesto` ADD CONSTRAINT `FK_rl_usuario_puesto_ct_usuario` FOREIGN KEY (`id_ct_usuario`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rl_usuario_puesto` ADD CONSTRAINT `fk_rl_usuario_puesto_actualizado_por` FOREIGN KEY (`ct_usuario_at`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rl_usuario_puesto` ADD CONSTRAINT `fk_rl_usuario_puesto_creado_por` FOREIGN KEY (`ct_usuario_in`) REFERENCES `ct_usuario`(`id_ct_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;
