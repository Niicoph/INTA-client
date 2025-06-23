import VisualizacionesIcon from '@/assets/Icons/Outlined/graficoBarras.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { MaquinariaContext } from '@/context/MaquinariaContext';
import Alert from '@/components/ui/alert';
import { columnsMaquinaria } from '@/components/ui/DataTable/columnsMaquinaria';
import { lazy, Suspense, useContext, useRef } from 'react';

const ChartMaquinaria = lazy(() => import('@/components/Charts/ChartMaquinaria'));
const DataTable = lazy(() => import('@/components/ui/DataTable/DataTable'));

import { type ColumnDef } from '@tanstack/react-table';

// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.vfs;
// import { mejorarImagenPDF } from '@/utils/mejorarImagenPDF';

export default function VisualizacionMaquinaria() {
  const maquinariaContext = useContext(MaquinariaContext);
  if (!maquinariaContext) {
    return null;
  }
  const { data } = maquinariaContext;

  const captureRef = useRef<HTMLDivElement>(null);
  // exportar a pdf
  //   const exportToPDF = async () => {
  //     if (!captureRef.current) {
  //       console.error('Elemento no encontrado para capturar');
  //       return;
  //     }

  //     console.log('Botón PDF clickeado');

  //     try {
  //       const dataUrl = await mejorarImagenPDF(captureRef.current);

  //       const tableBody = [
  //         ['Conjunto', 'Costo total por hora ($)'],
  //         ...costosEconomicos.map((item) => [
  //           item.id_conjunto,
  //           item.costo_total_hora.toLocaleString('es-AR', { minimumFractionDigits: 2 }),
  //         ]),
  //       ];

  //       const docDefinition: any = {
  //         content: [
  //           { text: 'Reporte de Maquinaria', style: 'header' },
  //           { image: dataUrl, width: 500 },
  //           { text: 'Tabla de Costos', style: 'subheader' },
  //           {
  //             table: {
  //               headerRows: 1,
  //               widths: ['auto', 'auto'],
  //               body: tableBody,
  //             },
  //             layout: 'lightHorizontalLines',
  //           },
  //         ],
  //         styles: {
  //           header: {
  //             fontSize: 20,
  //             bold: true,
  //             margin: [0, 0, 0, 10],
  //           },
  //           subheader: {
  //             fontSize: 16,
  //             bold: true,
  //             margin: [0, 10, 0, 5],
  //           },
  //         },
  //       };

  //       pdfMake.createPdf(docDefinition).download('maquinaria.pdf');
  //     } catch (error) {
  //       console.error('Error al generar la imagen o el PDF:', error);
  //     }
  //   };

  // Excel
  const downloadXLS = async () => {
    try {
      const { default: DownloadXLS } = await import('@/utils/SectionXLS/DownloadXLS');
      DownloadXLS(data, 'maquinaria');
    } catch (error) {
      console.error('Error con el excel', error);
    }
  };

  return (
    <div className="rounded-md flex flex-col border border-border overflow-hidden w-full xl:h-full">
      <TitleContainer icon={VisualizacionesIcon} title="Visualización Gráfica" />
      <div className="w-full rounded-b-lg p-4 gap-4 flex flex-col overflow-hidden h-[600px] xl:h-full">
        <Tabs
          defaultValue="tab1"
          className="w-full flex flex-col flex-1 justify-between gap-4 h-full"
        >
          <div className="w-full flex flex-col gap-2 md:flex-row">
            <TabsList className="h-10 text-lg w-full md:w-fit">
              <TabsTrigger value="tab1">Gráfico y Tabla</TabsTrigger>
              <TabsTrigger value="tab2">Tabla</TabsTrigger>
              <TabsTrigger value="tab3">Gráfico</TabsTrigger>
            </TabsList>
            <Button variant="outline" className="ml-auto h-10 w-full md:w-fit">
              PDF
              <Download size={24} strokeWidth={2} />
            </Button>
            <Button variant="outline" className="h-10 w-full md:w-fit " onClick={downloadXLS}>
              Excel
              <Download size={24} strokeWidth={2} />
            </Button>
          </div>
          <TabsContent
            value="tab1"
            aria-label="GraficoTabla"
            className="w-full min-w-0 grid grid-rows-2 gap-4 overflow-hidden h-full"
          >
            <div ref={captureRef} className="overflow-x-auto">
              {data.length > 0 ? (
                <Suspense fallback={<Alert text="Cargando gráfico..." />}>
                  <ChartMaquinaria conjuntosMaquinaria={data} />
                </Suspense>
              ) : (
                <Alert text="No hay conjuntos para mostrar." />
              )}
            </div>
            <div className="overflow-x-auto">
              {data.length > 0 ? (
                <Suspense fallback={<Alert text="Cargando tabla..." />}>
                  <DataTable
                    columns={columnsMaquinaria as ColumnDef<unknown, unknown>[]}
                    data={data}
                  />
                </Suspense>
              ) : (
                <Alert text="No hay conjuntos para mostrar." />
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="tab2"
            aria-label="Tabla"
            className="w-full min-w-0 grid grid-rows-1 gap-4 overflow-hidden h-full"
          >
            <div className="overflow-x-auto h-full">
              {data.length > 0 ? (
                <Suspense fallback={<Alert text="Cargando tabla..." />}>
                  <DataTable
                    columns={columnsMaquinaria as ColumnDef<unknown, unknown>[]}
                    data={data}
                  />
                </Suspense>
              ) : (
                <Alert text="No hay conjuntos para mostrar." />
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="tab3"
            aria-label="Grafico"
            className="w-full min-w-0 grid grid-rows-1 gap-4 overflow-hidden h-full"
          >
            <div className="overflow-x-auto">
              {data.length > 0 ? (
                <Suspense fallback={<Alert text="Cargando gráfico..." />}>
                  <ChartMaquinaria conjuntosMaquinaria={data} />
                </Suspense>
              ) : (
                <Alert text="No hay conjuntos para mostrar." />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
