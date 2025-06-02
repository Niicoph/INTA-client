import { z } from 'zod';

export const PresentacionSchema = z.object({
  id_sanitizante: z.string({
    required_error: 'El principio activo es obligatorio',
    invalid_type_error: 'Debe seleccionar un principio activo',
  }),
  // Precarga.nombre
  nombre: z.string({
    required_error: 'El principio activo es obligatorio',
    invalid_type_error: 'Debe seleccionar un principio activo',
  }),
  // Precarga.precio_usd_unidad
  precio_usd_unidad: z
    .number({
      required_error: 'El precio en dólares es obligatorio',
      invalid_type_error: 'Debe ser un número',
    })
    .positive('Debe ser un valor positivo'),
  // Precarga.dosis
  dosis: z
    .number({
      required_error: 'La dosis es obligatoria',
      invalid_type_error: 'Debe ser un número',
    })
    .positive('Debe ser un valor positivo'),
  // Precarga.unidad
  unidad: z.string({
    required_error: 'La unidad es obligatoria',
    invalid_type_error: 'Debe seleccionar una unidad',
  }),
  // Usuario
  cant_envase: z
    .number({
      required_error: 'La cantidad del envase es obligatoria',
      invalid_type_error: 'Debe ser un número',
    })
    .positive('Debe ser un valor positivo'),
});

export const AplicacionSchema = z.object({
  presentacion: PresentacionSchema,
  volumen_hl_ha: z
    .number({
      required_error: 'El volumen es obligatorio',
      invalid_type_error: 'Debe ser un número',
    })
    .positive('Debe ser un valor positivo'),
  cant_tratamientos: z
    .number({
      required_error: 'La cantidad de tratamientos es obligatoria',
      invalid_type_error: 'Debe ser un número',
    })
    .int('Debe ser un número entero')
    .positive('Debe ser un valor positivo'),
});

export const PlanSchema = z.object({
  aplicaciones: z.array(AplicacionSchema).nonempty('Debe incluir al menos una aplicación'),
});
