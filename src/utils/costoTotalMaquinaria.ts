import { type MaquinariaFormData } from '@/schemas/MaquinariaNew/types';
import { type costoEconomico } from '@/types/maquinaria';

export const calcularCostoTotalMaquinaria = ( data: MaquinariaFormData[] ): costoEconomico[] => {
  return data.map((conjunto, index) => {
    const valorResidual = (conjunto.valor_residual_pct_i * conjunto.precio_usd_i) / 100;
    const amortizacion =
      ((conjunto.precio_usd_i - valorResidual) / conjunto.horas_utiles_i) * conjunto.cotizacion_usd;
    const costoCombustible =
      conjunto.potencia_CV * conjunto.consumo_litros_hora_CV * conjunto.cotizacion_usd;
    const costoMantenimiento =
      conjunto.coef_gastos_conservacion_i * conjunto.precio_usd_i * conjunto.cotizacion_usd;

    const valorResidualTractor = (conjunto.valor_residual_pct_t * conjunto.precio_usd_t) / 100;
    const amortizacionTractor =
      ((conjunto.precio_usd_t - valorResidualTractor) / conjunto.horas_utiles_t) *
      conjunto.cotizacion_usd;
    const costoMantenimientoTractor =
      conjunto.coef_gastos_conservacion_t * conjunto.precio_usd_t * conjunto.cotizacion_usd;

    return {
      total: amortizacion + costoCombustible + costoMantenimiento + amortizacionTractor + costoMantenimientoTractor,
      conjunto: `${index + 1}`,
    };
  });
};
