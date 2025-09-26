/**
 * @fileoverview Utilidades para traducir mensajes de error de Zod al español
 */

/**
 * Traduce mensajes de error de Zod al español
 */
export function traducirMensajeZod(mensaje: string, campo: string): string {
  // Mapeo de mensajes comunes de Zod
  const traducciones: Record<string, string> = {
    Required: `El campo '${campo}' es requerido`,
    "Invalid input: expected number, received undefined": `El campo '${campo}' debe ser un número`,
    "Invalid input: expected string, received undefined": `El campo '${campo}' debe ser una cadena de texto`,
    "Invalid input: expected boolean, received undefined": `El campo '${campo}' debe ser verdadero o falso`,
    "Invalid input: expected date, received undefined": `El campo '${campo}' debe ser una fecha válida`,
    "Expected number, received string": `El campo '${campo}' debe ser un número`,
    "Expected string, received number": `El campo '${campo}' debe ser una cadena de texto`,
    "Expected boolean, received string": `El campo '${campo}' debe ser verdadero o falso`,
    "String must contain at least 1 character(s)": `El campo '${campo}' no puede estar vacío`,
    "Number must be greater than 0": `El campo '${campo}' debe ser mayor que 0`,
    "Number must be positive": `El campo '${campo}' debe ser un número positivo`,
    "Invalid email": `El campo '${campo}' debe ser un email válido`,
    "Invalid date": `El campo '${campo}' debe ser una fecha válida`,
    "Too small": `El campo '${campo}' es demasiado pequeño`,
    "Too big": `El campo '${campo}' es demasiado grande`,
  };

  // Buscar traducción exacta
  if (traducciones[mensaje]) {
    return traducciones[mensaje];
  }

  // Buscar patrones comunes
  if (mensaje.includes("expected number, received")) {
    return `El campo '${campo}' debe ser un número`;
  }
  if (mensaje.includes("expected string, received")) {
    return `El campo '${campo}' debe ser una cadena de texto`;
  }
  if (mensaje.includes("expected boolean, received")) {
    return `El campo '${campo}' debe ser verdadero o falso`;
  }
  if (mensaje.includes("expected date, received")) {
    return `El campo '${campo}' debe ser una fecha válida`;
  }
  if (mensaje.includes("must contain at least")) {
    const match = mensaje.match(/at least (\d+)/);
    const minLength = match ? match[1] : "1";
    return `El campo '${campo}' debe tener al menos ${minLength} caracteres`;
  }
  if (mensaje.includes("must contain at most")) {
    const match = mensaje.match(/at most (\d+)/);
    const maxLength = match ? match[1] : "255";
    return `El campo '${campo}' debe tener máximo ${maxLength} caracteres`;
  }
  if (mensaje.includes("Invalid email")) {
    return `El campo '${campo}' debe ser un email válido`;
  }

  // Si no hay traducción específica, devolver mensaje genérico
  return `El campo '${campo}' tiene un valor inválido`;
}
