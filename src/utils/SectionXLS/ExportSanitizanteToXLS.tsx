import * as XLSX from 'xlsx';
import type { Plan } from '@/types/sanitizante';

//instalar SheetJS con npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
//desintalar con npm rm --save xlsx

export default function exportSanitizanteToXLS(planes: Plan[]) {
  const columnHeadersMap: Record<string, string> = {
    id_plan: 'Plan',
    cotizacion_usd: 'Cotización USD',
    costo_x_ha: 'Costo Total Plan',
    id_tratamiento: 'Tto.',
    tratamiento_fecha: 'Fecha',
    costo_tratamiento: 'Costo Tratamiento',
    nombre_producto: 'Producto',
    volumen_envase: 'Vol. envase',
    unidad_envase: 'Unidad envase',
    precio_usd_envase: 'USD envase',
    dosis_x_hl: 'Dosis/hl',
    volumen_aplicado: 'Vol. Aplicado/hl',
    costo_aplicacion: 'Costo Aplicacion/ha',
    tipo_producto: 'Tipo',
  };

  const flatData = planes.flatMap((plan) =>
    plan.tratamientos.flatMap((tratamiento) =>
      tratamiento.aplicaciones.map((aplicacion) => ({
        id_plan: plan.id_plan,
        cotizacion_usd: plan.cotizacion_usd,
        costo_x_ha: plan.costo_total,

        id_tratamiento: tratamiento.id_tratamiento,
        tratamiento_fecha: tratamiento.fecha.toLocaleDateString('es-AR'),
        costo_tratamiento: tratamiento.costo_total,

        nombre_producto: aplicacion.producto.nombre,
        volumen_envase: aplicacion.producto.volumen_envase,
        unidad_envase: aplicacion.producto.unidad,
        precio_usd_envase: aplicacion.producto.precio_usd_envase,
        dosis_x_hl: aplicacion.producto.dosis_x_hl,
        tipo_producto: aplicacion.producto.tipo,

        volumen_aplicado: aplicacion.volumen_x_ha,
        costo_aplicacion: aplicacion.costo_total,
      }))
    )
  );

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
    'Costo Total Plan',
    'Costo Tratamiento',
    'USD Envase',
    'Costo Aplicacion/ha',
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
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sanitizantes');

  XLSX.writeFile(workbook, 'Sanitizantes.xlsx');
}
