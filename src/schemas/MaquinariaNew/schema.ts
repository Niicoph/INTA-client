import { z } from 'zod';

export const MaquinariaSchema = z.object({
  cotizacion_usd: z
  .number({
    required_error: 'La cotización del dólar es obligatoria',
    invalid_type_error: 'Debe ser un número',
  })
  .positive('Debe ser un valor positivo'),

  tractor: z
  .string({
    required_error: 'La selección de tractor es obligatoria',
    invalid_type_error: 'Debe seleccionar una opción',
  }),

  potencia_CV: z
  .number({
    required_error: 'La potencia del tractor es obligatoria',
    invalid_type_error: 'Debe ser un número',
  })
  .min(1, 'Debe ser mayor que 0'),

  precio_usd_t: z
  .number({
    required_error: 'El precio en usd del tractor es obligatorio',
    invalid_type_error: 'Debe ser un número',
  })
  .min(1, 'Debe ser mayor que 0'),
  
  coef_gastos_conservacion_t: z
  .number({
    required_error: 'El coeficiente de gastos de conservación es obligatorio',
    invalid_type_error: 'Debe ser un número',
  })
  .min(0, 'Debe ser un valor positivo o cero'),
  
  horas_utiles_t: z
  .number({
    required_error: 'Las horas útiles del tractor son obligatorias',
    invalid_type_error: 'Debe ser un número',
  })
  .min(1, 'Debe ser mayor que cero'),

  valor_residual_pct_t: z
  .number({
    required_error: 'El valor residual del tractor es obligatorio',
    invalid_type_error: 'Debe ser un número',
  })
  .min(0, 'Debe ser un valor positivo o cero'),

  implemento: z
  .string({
    required_error: 'El implemento es obligatorio',
    invalid_type_error: 'Debe ser un texto',
  }),
  
  precio_usd_i: z
  .number({
    required_error: 'El precio del implemento es obligatorio',
    invalid_type_error: 'Debe ser un número',
  })
  .min(1, 'Debe ser mayor que 0'),
  
  coef_gastos_conservacion_i: z
  .number({
    required_error: 'El coeficiente de gastos de conservación es obligatorio',
    invalid_type_error: 'Debe ser un número',
  })
  .min(0, 'Debe ser un valor positivo o cero'),

  horas_utiles_i: z
  .number({
    required_error: 'Las horas útiles del implemento son obligatorias',
    invalid_type_error: 'Debe ser un número',
  })
  .min(1, 'Debe ser mayor que cero'),

  valor_residual_pct_i: z
  .number({
    required_error: 'El valor residual del implemento es obligatorio',
    invalid_type_error: 'Debe ser un número',
  })
  .min(0, 'Debe ser un valor positivo o cero'),

  consumo_litros_hora_CV: z
  .number({
    required_error: 'El consumo es obligatorio',
    invalid_type_error: 'Debe ser un número',
  })
  .min(0.01, 'Debe ser mayor que cero'),  
});