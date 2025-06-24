import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { MaquinariaContext } from '@/context/MaquinariaContext';
import Alert from '@/components/ui/alert';
import { columnsMaquinaria } from '@/components/ui/DataTable/columnsMaquinaria';
import { lazy, Suspense, useContext } from 'react';
import LoadingSpinner from '../Loadings/LoadingSpinner/LoadingSpinner';

const ChartMaquinaria = lazy(() => import('@/components/Charts/ChartMaquinaria'));
const DataTable = lazy(() => import('@/components/ui/DataTable/DataTable'));

import { type ColumnDef } from '@tanstack/react-table';
import jsPDF from 'jspdf';
import { svg2pdf } from 'svg2pdf.js';

export default function VisualizacionMaquinaria() {
  const maquinariaContext = useContext(MaquinariaContext);
  if (!maquinariaContext) {
    return null;
  }
  const { data } = maquinariaContext;

  const downloadPDF = async () => {
    try {
      const svgElement = document.querySelector('.chart-maquinaria-export svg') as SVGSVGElement;
      if (!svgElement) {
        console.error('No se encontró el SVG del gráfico');
        return;
      }
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();

      await svg2pdf(svgElement, pdf, {
        x: 0,
        y: 0,
        width: pageWidth,
        height: 500,
      });

      pdf.save('grafico-maquinaria.pdf');
    } catch (error) {
      console.error('Error al generar el PDF', error);
    }
  };

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
      <TitleContainer type="visualizacion" />
      <div className="w-full rounded-b-lg p-4 gap-4 flex flex-col overflow-hidden h-[1000px] xl:h-full">
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
            <Button
              variant="outline"
              className="ml-auto h-10 w-full md:w-fit"
              onClick={downloadPDF}
            >
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
            <div className="overflow-x-auto">
              {data.length > 0 ? (
                <Suspense fallback={<LoadingSpinner />}>
                  <ChartMaquinaria conjuntosMaquinaria={data} />
                </Suspense>
              ) : (
                <Alert text="No hay conjuntos para mostrar." />
              )}
            </div>
            <div className="overflow-x-auto">
              {data.length > 0 ? (
                <Suspense fallback={<LoadingSpinner />}>
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
                <Suspense fallback={<LoadingSpinner />}>
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
                <Suspense fallback={<LoadingSpinner />}>
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
