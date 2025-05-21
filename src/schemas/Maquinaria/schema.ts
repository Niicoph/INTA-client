import { z } from 'zod';

export const MaquinariaSchema = z.object({
  valorDolar: z
    .number({
      required_error: 'El valor del dólar es obligatorio',
      invalid_type_error: 'Debe ser un número',
    })
    .positive('Debe ser un valor positivo'),

  potenciaTractor: z
    .number({
      required_error: 'La potencia del tractor es obligatoria',
      invalid_type_error: 'Debe ser un número',
    })
    .min(1, 'Debe ser mayor que 0'),

  implemento: z.string({
    required_error: 'El implemento es obligatorio',
    invalid_type_error: 'Debe ser un texto',
  }),

  valorImplemento: z
    .number({
      required_error: 'El valor del implemento es obligatorio',
      invalid_type_error: 'Debe ser un número',
    })
    .min(1, 'Debe ser mayor que 0'),

  gastoCoeficiente: z
    .number({
      required_error: 'El coeficiente de gasto es obligatorio',
      invalid_type_error: 'Debe ser un número',
    })
    .min(0, 'Debe ser un valor positivo o cero'),

  valorResidual: z
    .number({
      required_error: 'El valor residual es obligatorio',
      invalid_type_error: 'Debe ser un número',
    })
    .min(0, 'Debe ser un valor positivo o cero'),

  consumo: z
    .number({
      required_error: 'El consumo es obligatorio',
      invalid_type_error: 'Debe ser un número',
    })
    .min(0.01, 'Debe ser mayor que cero'),

  minutosUtiles: z
    .number({
      required_error: 'Los minutos útiles son obligatorios',
      invalid_type_error: 'Debe ser un número',
    })
    .min(1, 'Debe ser mayor que cero'),
});
