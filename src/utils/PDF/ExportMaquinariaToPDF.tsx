import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.vfs;
import svgToDataURL from './svgToImagePDF';
import { type ConjuntoMaquinaria } from '@/types/maquinaria';
import createHeader from './createHeader';
import header from '@/assets/utils/encabezadoINTA.png?url';
import { getTimestampString } from '../getTimestampString';

export default async function ExportMaquinariaToPDF(
  ConjuntoMaquinaria: ConjuntoMaquinaria[],
  chartMaquinaria: SVGSVGElement
) {
  try {
    const imageHeader = await createHeader(header);

    const imageChart = await svgToDataURL(chartMaquinaria, 3);

    const tableGeneralBody = [
      [
        { text: 'Tabla de Costos', style: 'subheader', colSpan: 5, alignment: 'left' },
        {},
        {},
        {},
        {},
      ],
      ['Conjunto', 'Cotización USD', 'Precio Gasoil', 'Costo Total $/h', 'Combustible $/h'],
      ...ConjuntoMaquinaria.map((item) => [
        item.id_conjunto,
        item.cotizacion_usd.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
        item.cotizacion_gasoil_litro.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
        }),
        item.costo_total_hora.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
        item.costo_combustible.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
      ]),
    ];

    const tableTractorBody = [
      [
        { text: 'Detalle de Tractores', style: 'subheader', colSpan: 9, alignment: 'left' },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        'Conjunto',
        'Tractor',
        'CV',
        'Precio USD',
        'Coef. Conserv.',
        'Horas Útiles',
        'Valor Residual',
        'Amort. $/h',
        'Mant. $/h',
      ],
      ...ConjuntoMaquinaria.map((item) => [
        item.id_conjunto,
        item.tractor.nombre,
        item.tractor.potencia_CV,
        item.tractor.precio_usd.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
        item.tractor.coef_gastos_conservacion,
        item.tractor.horas_utiles,
        item.tractor.valor_residual_pct.toLocaleString('es-AR', {
          style: 'percent',
          maximumFractionDigits: 2,
        }),
        item.tractor.amortizacion?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
        item.tractor.costo_mantenimiento?.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
        }),
      ]),
    ];

    const tableImplementoBody = [
      [
        { text: 'Detalle de Implementos', style: 'subheader', colSpan: 9, alignment: 'left' },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        'Conj.',
        'Implemento',
        'Consumo lt/h HP',
        'Precio USD',
        'Coef. Conserv.',
        'Horas Útiles',
        'Valor Residual',
        'Amort. $/h',
        'Mant. $/h',
      ],
      ...ConjuntoMaquinaria.map((item) => [
        item.id_conjunto,
        item.implemento.nombre,
        item.implemento.consumo_litros_hora_CV,
        item.implemento.precio_usd.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
        }),
        item.implemento.coef_gastos_conservacion,
        item.implemento.horas_utiles,
        item.implemento.valor_residual_pct.toLocaleString('es-AR', {
          style: 'percent',
          maximumFractionDigits: 2,
        }),
        item.implemento.amortizacion?.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
        }),
        item.implemento.costo_mantenimiento?.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
        }),
      ]),
    ];

    const separador = {
      canvas: [
        {
          type: 'line',
          x1: 0,
          y1: 0,
          x2: 555,
          y2: 0,
          lineWidth: 1,
          lineColor: '#f54a00',
        },
      ],
      margin: [0, 0, 0, 10],
    };

    // pdfMake.tableLayouts = {
    //   exampleLayout: {
    // 		// hLineWidth: function (i, node) {
    // 		// 	return (i === 0 || i === node.table.body.length) ? 2 : 1;
    // 		// },
    // 		// vLineWidth: function (i, node) {
    // 		// 	return (i === 0 || i === node.table.widths?.length) ? 2 : 1;
    // 		// },
    // 		// hLineColor: function (i, node) {
    // 		// 	return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
    // 		// },
    // 		// vLineColor: function (i, node) {
    // 		// 	return (i === 0 || i === node.table.widths?.length) ? 'black' : 'gray';},
    //     paddingLeft: function (i) {
    //       return i === 0 ? 0 : 8;
    //     },
    //     paddingRight: function (i) {
    //       return i === 0 ? 0 : 8;
    //     },
    //   },
    // };

    const docDefinition: any = {
      header: {
        image: imageHeader,
        width: 595,
      },
      content: [
        { text: 'Reporte de Maquinaria', style: 'header' },

        separador,
        ,
        {
          table: {
            widths: ['*'],
            headerRows: 0,
            body: [
              [{ text: 'Visualización gráfica', style: 'subheader' }],
              [
                {
                  image: imageChart,
                  width: 500,
                  height: 250,
                  alignment: 'center',
                  margin: [0, 0, 0, 0],
                },
              ],
            ],
          },
          layout: 'lightHorizontalLines',
        },
        {
          table: {
            headerRows: 2,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
            body: tableGeneralBody,
          },
          layout: 'lightHorizontalLines',
          style: 'tableCell',
        },
        {
          table: {
            headerRows: 2,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: tableTractorBody,
          },
          layout: 'lightHorizontalLines',
          style: 'tableCell',
        },
        {
          table: {
            headerRows: 2,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: tableImplementoBody,
          },
          layout: 'lightHorizontalLines',
          style: 'tableCell',
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableCell: {
          fontSize: 10,
          alignment: 'left',
        },
      },
      pageSize: 'A4',
      pageMargins: [20, 60, 20, 60],
    };

    pdfMake.createPdf(docDefinition).download('conjuntos_maquinaria_'+getTimestampString()+'.pdf');
  } catch (error) {
    console.error('Error al generar la imagen o el PDF:', error);
  }
}
