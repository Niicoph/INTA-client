export type Maquinaria = {
    conjunto: string;
    potencia: number;
    implemento: string;
    valorimplemento: number;
    coeficiente: number;
    minutos: number; //minutos utiles
    residuo: number;
    consumo: number; //litro/hora
    costohora: number;
}

export type Implemento = {
  nombre: string;
  precio_usd: number;
  coef_gastos_conservacion: number;
  horas_utiles: number;
  valor_residual_pct: number;
  consumo_litros_hora_CV: number;
}

export type Tractor = {
  id: string,
  marca: string;
  modelo: string;
  potencia_CV: number;
  precio_usd: number;
  coef_gastos_conservacion: number;
  horas_utiles: number;
  valor_residual_pct: number;
  implementos: Implemento[];
}