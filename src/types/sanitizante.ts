export type Sanitizante = {
  id: string;
  nombre: string;
  precio_usd_unidad: number;
  unidad: string;
  dosis: number;
};

export type PresentacionSanitizante = {
  sanitizante: Sanitizante;
  cant_envase: number;
};

export type Aplicacion = {
  presentacion: PresentacionSanitizante;
  volumen_hl_ha: number;
  cant_tratamientos: number;
};

export type Plan = {
    aplicaciones: Aplicacion[]
}
