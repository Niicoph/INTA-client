import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.vfs;
import svgToDataURL from './svgToImagePDF';
import { type Plan } from '@/types/fertilizacion';
import createHeader from './createHeader';
import header from '/images/encabezadoINTA.png?url';
import { getTimestampString } from '../getTimestampString';

export default async function ExportSanitizanteToPDF(Planes: Plan[], ChartFertilizacion: SVGSVGElement) {
  try {
    const imageHeader = await createHeader(header);
    console.log(ChartFertilizacion);

    const imageChart = await svgToDataURL(ChartFertilizacion, 3);

    const tablePlanBody = [
      [
        { text: 'Tabla de Costos', style: 'subheader', colSpan: 6, alignment: 'left' },
        {},
        {},
        {},
        {},
        {},
      ],
      ['Plan', 'Cotización USD', 'Costo Total Plan', 'Tratamiento', 'Fecha', 'Costo Tratamiento'],
      ...Planes.flatMap((plan) =>
        plan.tratamientos.flatMap((tratamiento) =>
          tratamiento.aplicaciones.map(() => [
            plan.id_plan,
            plan.cotizacion_usd.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
            plan.costo_total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
            tratamiento.id_tratamiento,
            tratamiento.fecha.toLocaleDateString('es-AR'),
            tratamiento.costo_total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
          ])
        )
      ),
    ];

    const tableProductBody = [
      [
        { text: 'Detalle de Productos', style: 'subheader', colSpan: 8, alignment: 'left' },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        'Plan',
        'Tratamiento',
        'Producto',
        'Vol. envase',
        'Unidad envase',
        'USD envase',
        'Dosis/ha',
        'Costo Aplicacion/ha',
      ],
      ...Planes.flatMap((plan) =>
        plan.tratamientos.flatMap((tratamiento) =>
          tratamiento.aplicaciones.map((aplicacion) => [
            plan.id_plan,
            tratamiento.id_tratamiento,
            aplicacion.producto.nombre,
            aplicacion.producto.volumen_envase,
            aplicacion.producto.unidad,
            aplicacion.producto.precio_usd_envase.toLocaleString('es-AR', {
              style: 'currency',
              currency: 'ARS',
            }),
            aplicacion.producto.dosis_x_ha,
            aplicacion.costo_total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
          ])
        )
      ),
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
        { text: 'Reporte de Sanitizantes', style: 'header' },

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
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: tablePlanBody,
          },
          layout: 'lightHorizontalLines',
          style: 'tableCell',
        },
        {
          table: {
            headerRows: 2,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: tableProductBody,
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

    pdfMake
      .createPdf(docDefinition)
      .download('conjuntos_sanitizante_' + getTimestampString() + '.pdf');
  } catch (error) {
    console.error('Error al generar la imagen o el PDF:', error);
  }
}
