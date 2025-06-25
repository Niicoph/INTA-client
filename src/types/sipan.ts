//Tipados de como se esperan los datos desde el SIPAN (Maquinarias/Productos)
export type MaquinariaSipan = {
  indicador: string;
  precio: string;
  coeficiente: string;
  vidautil: string;
  valorresidual: string;
  consumo: string | null;
  moneda: string;
  fecha: string;
};

export type ProductoSipan = {
  indicador: string;
  precio: string | null;
  moneda: string;
  unidad: string;
  unidadsigla: string | null;
  rubro: string;
  fecha: string;
};