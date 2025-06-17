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
    producto : Producto;
    volumen_aplicado : number;
}

export type Tratamiento = {
  id_tratamiento: string;
  aplicaciones: Aplicacion[];
};

export type Plan = {
  id_plan: string;
  tratamientos: Tratamiento[];
};

export type CostoTratamiento = {
    tratamiento: Tratamiento;
    costo_total: number;
};

export type CostoPlan = {
    plan: Plan;
    costos_tratamientos: CostoTratamiento[];
    costo_total: number;
}



export const unidades: string[] = ['lts', 'kg'];
