export type Tractor = {
  id: string;
  marca: string;
  modelo: string;
  potencia_CV: number;
  precio_usd: number;
  coef_gastos_conservacion: number;
  horas_utiles: number;
  valor_residual_pct: number;
  implementos: Implemento[];
};

export type Implemento = {
  nombre: string;
  precio_usd: number;
  coef_gastos_conservacion: number;
  horas_utiles: number;
  valor_residual_pct: number;
  consumo_litros_hora_CV: number;
};

export type CostoEconomico = {
  id_conjunto?: string,

  conjunto: {
    cotizacion_usd: number;
    cotizacion_gasoil_litro: number;

    tractor: string;
    potencia_CV: number;
    precio_usd_t: number;
    coef_gastos_conservacion_t: number;
    horas_utiles_t: number;
    valor_residual_pct_t: number;

    implemento: string,
    precio_usd_i: number,
    coef_gastos_conservacion_i: number,
    horas_utiles_i: number,
    valor_residual_pct_i: number;
    consumo_litros_hora_CV: number;
  },

  amortizacion_t: number,
  costo_mantenimiento_t: number,
  
  amortizacion_i: number,
  costo_combustible: number,
  costo_mantenimiento_i: number,

  costo_total_hora: number;
};
