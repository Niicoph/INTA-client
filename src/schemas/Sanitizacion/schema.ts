import { z } from 'zod';
import { unidades } from '@/types/sanitizante';
export const ProductoSchema = z.object({
  id_sanitizante: z.string({
    required_error: 'El principio activo es obligatorio',
    invalid_type_error: 'Debe seleccionar un principio activo',
  }),
  // Precarga.nombre
  nombre: z.string({
    required_error: 'El principio activo es obligatorio',
    invalid_type_error: 'Debe seleccionar un principio activo',
  }),
  // Precarga.precio_usd_envase
  precio_usd_envase: z.number({
      required_error: 'El precio en dólares es obligatorio',
      invalid_type_error: 'Debe ser un número',
    })
    .positive('Debe ser un valor positivo'),
  // Precarga.volumen_envase
  volumen_envase: z.number({
      required_error: 'La cantidad del envase es obligatoria',
      invalid_type_error: 'Debe ser un número',
    })
    .positive('Debe ser un valor positivo'),
  // Precarga.unidad
  unidad: z.string({
    required_error: 'La unidad es obligatoria',
    invalid_type_error: 'Debe seleccionar una unidad',
  }).refine((val) => unidades.includes(val), {
    message: "La unidad no es válida",
  }),
  // Precarga.dosis_x_hl
  dosis_x_hl: z.number({
      required_error: 'La dosis es obligatoria',
      invalid_type_error: 'Debe ser un número',
    })
    .positive('Debe ser un valor positivo'),
  // Precarga.tipo
  tipo: z.string({
      required_error: 'El tipo de sanitizante es obligatorio',
      invalid_type_error: 'Debe seleccionar un tipo',
    }),
});

export const AplicacionSchema = z.object({
    producto: z.object(ProductoSchema.shape, {
      required_error: 'Debe seleccionar un producto',
      invalid_type_error: 'Debe seleccionar una opción',
    }),
    volumen_aplicado : z.number({
        required_error: 'Debe ingresar un volumen aplicado',
        invalid_type_error: 'Debe ser un número'
    },).positive('Debe ser un valor positivo'),

})

export const TratamientoSchema = z.object({
    id_tratamiento: z.string(),
    aplicaciones: z.array(AplicacionSchema).min(1, 'Debe incluir al menos una aplicación'),
});


export const PlanSchema = z.object({
  id_plan: z.string(),
  tratamientos: z.array(TratamientoSchema)
  .nonempty('Debe incluir al menos un tratamiento'),
});
