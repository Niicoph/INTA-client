import { type MaquinariaFormData } from '@/schemas/MaquinariaNew/types';
import { type CostoEconomico } from '@/types/maquinaria';

export const calcularCostoTotalMaquinaria = ( data: MaquinariaFormData[] ): CostoEconomico[] => {
  return data.map((conjunto, index) => {

    //Calculos Implemento
    const valor_residual_i = Number(((conjunto.valor_residual_pct_i * conjunto.precio_usd_i) / 100).toFixed(2));

    const amortizacion_i =
      Number((((conjunto.precio_usd_i - valor_residual_i) / conjunto.horas_utiles_i) * conjunto.cotizacion_usd).toFixed(2));

    const costo_combustible =
      Number((conjunto.potencia_CV * conjunto.consumo_litros_hora_CV * conjunto.cotizacion_usd).toFixed(2));

    const costo_mantenimiento_i =
      Number((conjunto.coef_gastos_conservacion_i * conjunto.precio_usd_i * conjunto.cotizacion_usd).toFixed(2));

    //Calculos Tractor
    const valor_residual_t = Number(((conjunto.valor_residual_pct_t * conjunto.precio_usd_t) / 100).toFixed(2));

    const amortizacion_t =
      Number((((conjunto.precio_usd_t - valor_residual_t) / conjunto.horas_utiles_t) *
      conjunto.cotizacion_usd).toFixed(2));

    const costo_mantenimiento_t =
      Number((conjunto.coef_gastos_conservacion_t * conjunto.precio_usd_t * conjunto.cotizacion_usd).toFixed(2));

    return {
      id_conjunto: `${index + 1}`,
      conjunto: conjunto,

      amortizacion_i: amortizacion_i,
      costo_combustible: costo_combustible,
      costo_mantenimiento_i: costo_mantenimiento_i,

      amortizacion_t: amortizacion_t,
      costo_mantenimiento_t: costo_mantenimiento_t,

      costo_total_hora: Number((amortizacion_i + costo_combustible + costo_mantenimiento_i + amortizacion_t + costo_mantenimiento_t).toFixed(2)),
    };
  });
};
