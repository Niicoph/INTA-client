export type Producto = {
  id_sanitizante: string;
  nombre: string;
  precio_usd_envase: number;
  volumen_envase: number;
  unidad: string;
  dosis_x_hl: number;
  tipo: string;
};

export type Tratamiento = {
  id_tratamiento: string;
  productos: Producto[];
};

export type Plan = {
  id_plan: string;
  tratamientos: Tratamiento[];
};

export const unidades: string[] = ['lts', 'kg'];
