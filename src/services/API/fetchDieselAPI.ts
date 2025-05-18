export interface ResultDiesel {
  provincia: string;
  precio: number;
  localidad: string;
  empresabandera: string;
  fecha_vigencia: string;
}

export async function fetchDieselAPI( province: string) : Promise<ResultDiesel[]> {

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const yearMonth = `${year}-${month}`;

  const filters = {
  producto: "Gas Oil Grado 2",
  empresabandera: "YPF",
  indice_tiempo: yearMonth,
  idtipohorario: "2",
  provincia: province
};
  const resource_id = "80ac25de-a44a-4445-9215-090cf55cfda5";
  const API_URL = `http://datos.energia.gob.ar/api/3/action/datastore_search?resource_id=${resource_id}&filters=${encodeURIComponent(JSON.stringify(filters))}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  if (!data.result || !data.result.records) {
    return [];
  }
  const records: ResultDiesel[] = data.result.records.map((record: unknown) => {
    const {
      provincia,
      precio,
      localidad,
      empresabandera,
      fecha_vigencia
    } = record as ResultDiesel;

    return {
      provincia,
      precio,
      localidad,
      empresabandera,
      fecha_vigencia
    };
  });

  return records;
}
