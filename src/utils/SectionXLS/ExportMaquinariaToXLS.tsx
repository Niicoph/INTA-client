import * as XLSX from 'xlsx';
import { type ConjuntoMaquinaria } from '@/types/maquinaria';

//instalar SheetJS con npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
//desintalar con npm rm --save xlsx

export default function exportMaquinariaToXLS(ConjuntoMaquinaria: ConjuntoMaquinaria[]) {
  const columnHeadersMap: Record<string, string> = {
    id_conjunto: 'Conjunto',
    cotizacion_usd: 'Cotización USD',
    cotizacion_gasoil_litro: 'Precio Gasoil',
    costo_total_hora: 'Costo Total $/h',
    costo_combustible: 'Combustible $/h',
    nombre_t: 'Tractor',
    potencia_CV: 'CV',
    precio_usd_t: 'Precio USD Tractor',
    coef_conservacion_t: 'Coef. Conserv. Tractor',
    horas_utiles_t: 'Horas Útiles Tractor',
    valor_residual_pct_t: 'Valor Residual Tractor',
    amortizacion_t: 'Amortización Tractor $/h',
    costo_mantenimiento_t: 'Mantenimiento Tractor $/h',
    nombre_i: 'Implemento',
    consumo_litros_hora_CV_i: 'Consumo lt/h CV',
    precio_usd_i: 'Precio USD Implemento',
    coef_gastos_conservacion_i: 'Coef. Conserv. Implemento',
    horas_utiles_i: 'Horas Útiles Implemento',
    valor_residual_pct_i: 'Valor Residual Implemento',
    amortizacion_i: 'Amortización Implemento $/h',
    costo_mantenimiento_i: 'Mantenimiento Implemento $/h',
  };

  const flatData = ConjuntoMaquinaria.map((item) => ({
    id_conjunto: item.id_conjunto,
    cotizacion_usd: item.cotizacion_usd,
    cotizacion_gasoil_litro: item.cotizacion_gasoil_litro,
    costo_total_hora: item.costo_total_hora,
    costo_combustible: item.costo_combustible,

    nombre_t: item.tractor.nombre,
    potencia_CV: item.tractor.potencia_CV,
    precio_usd_t: item.tractor.precio_usd,
    coef_conservacion_t: item.tractor.coef_gastos_conservacion,
    horas_utiles_t: item.tractor.horas_utiles,
    valor_residual_pct_t: item.tractor.valor_residual_pct,
    amortizacion_t: item.tractor.amortizacion,
    costo_mantenimiento_t: item.tractor.costo_mantenimiento,

    nombre_i: item.implemento.nombre,
    consumo_litros_hora_CV_i: item.implemento.consumo_litros_hora_CV,
    precio_usd_i: item.implemento.precio_usd,
    coef_gastos_conservacion_i: item.implemento.coef_gastos_conservacion,
    horas_utiles_i: item.implemento.horas_utiles,
    valor_residual_pct_i: item.implemento.valor_residual_pct,
    amortizacion_i: item.implemento.amortizacion,
    costo_mantenimiento_i: item.implemento.costo_mantenimiento,
  }));

  const renamedData =
    flatData.length > 0
      ? flatData.map((row) => {
          const renamedRow: Record<string, any> = {};
          for (const key in row) {
            if (key in columnHeadersMap) {
              renamedRow[columnHeadersMap[key]] = (row as Record<string, any>)[key];
            }
          }
          return renamedRow;
        })
      : [Object.fromEntries(Object.values(columnHeadersMap).map((header) => [header, '']))];

  const worksheet = XLSX.utils.json_to_sheet(renamedData);

  const columnWidths = Object.keys(renamedData[0]).map((key) => {
    const headerLength = key.length;
    const maxCellLength = Math.max(
      ...renamedData.map((row) => (row[key] ? row[key].toString().length : 0))
    );
    return { wch: Math.max(headerLength, maxCellLength) };
  });
  worksheet['!cols'] = columnWidths;

  const currencyColumns = [
    'Cotización USD',
    'Precio Gasoil',
    'Costo Total $/h',
    'Combustible $/h',
    'Precio USD Tractor',
    'Amortización Tractor $/h',
    'Mantenimiento Tractor $/h',
    'Precio USD Implemento',
    'Amortización Implemento $/h',
    'Mantenimiento Implemento $/h',
  ];

  const headers = Object.keys(renamedData[0]);
  const currencyIndexes = headers
    .map((header, idx) => (currencyColumns.includes(header) ? idx : -1))
    .filter((idx) => idx !== -1);

  renamedData.forEach((_, rowIdx) => {
    currencyIndexes.forEach((colIdx) => {
      const cellAddress = XLSX.utils.encode_cell({ c: colIdx, r: rowIdx + 1 });
      const cell = worksheet[cellAddress];
      if (cell && typeof cell.v === 'number') {
        cell.z = '[$$-es-AR]#,##0.00';
      }
    });
  });

  const percentColumns = ['Valor Residual Tractor', 'Valor Residual Implemento'];

  const percentIndexes = headers
    .map((header, idx) => (percentColumns.includes(header) ? idx : -1))
    .filter((idx) => idx !== -1);

  renamedData.forEach((_, rowIdx) => {
    percentIndexes.forEach((colIdx) => {
      const cellAddress = XLSX.utils.encode_cell({ c: colIdx, r: rowIdx + 1 });
      const cell = worksheet[cellAddress];
      if (cell && typeof cell.v === 'number') {
        cell.v = cell.v / 100;
        cell.z = '0.00%';
      }
    });
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Maquinaria');

  XLSX.writeFile(workbook, 'Maquinaria.xlsx');
}
