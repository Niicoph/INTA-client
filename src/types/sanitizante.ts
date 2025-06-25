export type Producto = {
  id_sanitizante: string;
  nombre: string;
  precio_usd_envase: number;
  volumen_envase: number;
  unidad: string;
  dosis_x_hl: number;
  tipo: string;
};

export type Aplicacion = {
  id_aplicacion: string;
  producto : Producto;
  volumen_x_ha : number;
  costo_total: number;
}

export type Tratamiento = {
  id_tratamiento: string;
  aplicaciones: Aplicacion[];
  costo_total: number;
  fecha: Date;
};

export type Plan = {
  id_plan: string;
  tratamientos: Tratamiento[];
  costo_total: number;
  cotizacion_usd: number;
};

export type FilaPlan = {
  id_plan: string;
  id_tratamiento: string;
  plan_rowspan: number;
  tratamiento_rowspan: number;
  tratamiento_fecha: Date;
  aplicacion: Aplicacion;
  costo_tratamiento: number;
  costo_x_ha: number;
  cotizacion_usd: number
};

export const unidades: string[] = ['Lts', 'Kg'];

