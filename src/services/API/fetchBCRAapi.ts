export interface Detail {
  tipoCotizacion: number;
}

export interface Result {
  tipoCotizacion: number;
  fecha: string;
  detalle: Detail[];
}

export interface ApiResponse {
  results: Result[];
}

export async function fetchExchangeRateBCRA(currency: string): Promise<Result> {
  const API_URL = `https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones/${currency}`;

  const response = await fetch(API_URL);

  const result: ApiResponse = await response.json();
  return result.results[0];
}