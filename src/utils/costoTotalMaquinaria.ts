import { type MaquinariaFormData } from '@/schemas/Maquinaria/types';
import { type ConjuntoMaquinaria } from '@/types/maquinaria';

export const calcularCostoTotalMaquinaria = (data: MaquinariaFormData): ConjuntoMaquinaria => {

  const valor_residual_i = Number(((data.valor_residual_pct_i * data.precio_usd_i) / 100).toFixed(2));

  const amortizacion_i = Number(
    (((data.precio_usd_i - valor_residual_i) / data.horas_utiles_i) * data.cotizacion_usd).toFixed(2)
  );

  const costo_combustible = Number(
    (data.potencia_CV * data.consumo_litros_hora_CV * data.cotizacion_gasoil_litro).toFixed(2)
  );

  const costo_mantenimiento_i = Number(
    (data.coef_gastos_conservacion_i * data.precio_usd_i * data.cotizacion_usd).toFixed(2)
  );

  const valor_residual_t = Number(((data.valor_residual_pct_t * data.precio_usd_t) / 100).toFixed(2));

  const amortizacion_t = Number(
    (((data.precio_usd_t - valor_residual_t) / data.horas_utiles_t) * data.cotizacion_usd).toFixed(2)
  );

  const costo_mantenimiento_t = Number(
    (data.coef_gastos_conservacion_t * data.precio_usd_t * data.cotizacion_usd).toFixed(2)
  );

  return {
    id_conjunto: data.id_conjunto,
    cotizacion_usd: data.cotizacion_usd,
    cotizacion_gasoil_litro: data.cotizacion_gasoil_litro,
    tractor: {  
      id_tractor: data.id_tractor,
      nombre: data.nombre_t,
      potencia_CV: data.potencia_CV,
      precio_usd: data.precio_usd_t,
      coef_gastos_conservacion: data.coef_gastos_conservacion_t,
      horas_utiles: data.horas_utiles_t,
      valor_residual_pct: data.valor_residual_pct_t,

      //Resultado de calculos
      amortizacion: amortizacion_t,
      costo_mantenimiento: costo_mantenimiento_t,
    },
    implemento: {  
      id_implemento: data.id_tractor,
      nombre: data.nombre_i,
      consumo_litros_hora_CV: data.consumo_litros_hora_CV,
      precio_usd: data.precio_usd_i,
      coef_gastos_conservacion: data.coef_gastos_conservacion_i,
      horas_utiles: data.horas_utiles_i,
      valor_residual_pct: data.valor_residual_pct_i,

      //Resultado de calculos
      amortizacion: amortizacion_i,
      costo_mantenimiento: costo_mantenimiento_i,
    },    
    costo_combustible: costo_combustible,
    costo_total_hora: Number((amortizacion_i + costo_combustible + costo_mantenimiento_i + amortizacion_t + costo_mantenimiento_t).toFixed(2)),
  };
};