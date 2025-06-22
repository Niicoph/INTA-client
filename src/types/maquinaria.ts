export type Tractor = {
  id_tractor: string;
  nombre: string;
  potencia_CV: number;
  precio_usd: number;
  coef_gastos_conservacion: number;
  horas_utiles: number;
  valor_residual_pct: number;

  //Resultado de calculos
  amortizacion?: number,
  costo_mantenimiento?: number,
};

export type Implemento = {
  id_implemento: string;
  nombre: string;
  precio_usd: number;
  coef_gastos_conservacion: number;
  horas_utiles: number;
  valor_residual_pct: number;
  consumo_litros_hora_CV: number;

  //Resultado de calculos junto tractor
  amortizacion?: number,  
  costo_mantenimiento?: number,
};

export type MaquinariaList = {
    tractores: Tractor[],
    implementos: Implemento[]
}

export type ConjuntoMaquinaria = {
  id_conjunto: string,
  cotizacion_usd: number;
  cotizacion_gasoil_litro: number;

  tractor: Tractor,
  implemento: Implemento,

  costo_combustible: number,
  costo_total_hora: number;
};
