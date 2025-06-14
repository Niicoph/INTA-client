import * as XLSX from 'xlsx';

//instalar SheetJS con npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
//desintalar con npm rm --save xlsx

export default function exportToXLS(costosEconomicos: any[]) {
  const columnHeadersMap: Record<string, string> = {
    id_conjunto: 'Conjunto',
    cotizacion_usd: 'Cotización USD',
    cotizacion_gasoil_litro: 'Precio Gasoil',
    nombre_t: 'Tractor',
    potencia_CV: 'CV',
    nombre_i: 'Implemento',
    amortizacion_t: 'Amortización Tractor $/h',
    costo_mantenimiento_t: 'Mantenimiento Tractor $/h',
    amortizacion_i: 'Amortización Implemento $/h',
    costo_combustible: 'Combustible $/h',
    costo_mantenimiento_i: 'Mantenimiento Implemento $/h',
    costo_total_hora: 'Costo Total $/h',
  };

  const flatData = costosEconomicos.map((item) => ({
    id_conjunto: item.id_conjunto,
    cotizacion_usd: item.conjunto.cotizacion_usd,
    cotizacion_gasoil_litro: item.conjunto.cotizacion_gasoil_litro,
    nombre_t: item.conjunto.nombre_t,
    potencia_CV: item.conjunto.potencia_CV,
    nombre_i: item.conjunto.nombre_i,
    amortizacion_t: item.amortizacion_t,
    costo_mantenimiento_t: item.costo_mantenimiento_t,
    amortizacion_i: item.amortizacion_i,
    costo_combustible: item.costo_combustible,
    costo_mantenimiento_i: item.costo_mantenimiento_i,
    costo_total_hora: item.costo_total_hora,
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
    'Amortización Tractor $/h',
    'Mantenimiento Tractor $/h',
    'Amortización Implemento $/h',
    'Combustible $/h',
    'Mantenimiento Implemento $/h',
    'Costo Total $/h',
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

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Maquinaria');

  XLSX.writeFile(workbook, 'Maquinaria.xlsx');
}
