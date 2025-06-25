import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CostoPlanContext } from '@/context/CostoPlanContext';
import { useContext, lazy, Suspense } from 'react';
import { columnsSanidad } from '../ui/DataTable/columnsSanidad';
import { flattenPlanes } from '@/utils/flattenPlanesSanitizacion';
import LoadingSpinner from '../Loadings/LoadingSpinner/LoadingSpinner';
import Alert from '@/components/ui/alert';
import { ExportarPopover } from '@/components/ui/exportar-popover';

const ChartSanidad = lazy(() => import('@/components/Charts/ChartSanidad'));
const DataTable = lazy(() => import('@/components/ui/DataTable/DataTable'));
import { type ColumnDef } from '@tanstack/react-table';

import emptyChart from '@/utils/PDF/EmptyChartPDF';

export default function VisualizacionSanitizacion() {
  const costoPlanContext = useContext(CostoPlanContext);
  if (!costoPlanContext) {
    return null;
  }

  const { data } = costoPlanContext;

  const filasTabla = flattenPlanes(data);

  const downloadPDF = async () => {
    try {
      const chart = document.querySelector('.chart-sanitizante-export svg') as SVGSVGElement;
      const svgElement = chart || emptyChart();

      const { default: DownloadPDF } = await import('@/utils/PDF/DownloadPDF');
      DownloadPDF(data, svgElement, 'sanitizante');
    } catch (error) {
      console.error('Error al generar el PDF', error);
    }
  };

  const downloadXLS = async () => {
    try {
      const { default: DownloadXLS } = await import('@/utils/SectionXLS/DownloadXLS');
      DownloadXLS(data, 'sanitizante');
    } catch (error) {
      console.error('Error con el excel', error);
    }
  };
  return (
    <div className="rounded-md flex flex-col border border-border overflow-hidden w-full xl:h-full">
      <TitleContainer type="visualizacion" />
      <div className="w-full rounded-b-lg p-4 gap-4 flex flex-col overflow-hidden h-[600px] xl:h-full">
        <Tabs
          defaultValue="tab1"
          className="w-full flex flex-col flex-1 justify-between gap-4 h-full"
        >
          <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between">
            <TabsList className="h-10 text-lg w-full md:w-fit">
              <TabsTrigger value="tab1">Gráfico y Tabla</TabsTrigger>
              <TabsTrigger value="tab2">Tabla</TabsTrigger>
              <TabsTrigger value="tab3">Gráfico</TabsTrigger>
            </TabsList>

            <ExportarPopover downloadPDF={downloadPDF} downloadXLS={downloadXLS} />
          </div>
          <TabsContent
            value="tab1"
            aria-label="GraficoTabla"
            className="w-full min-w-0 grid grid-rows-2 gap-4 overflow-hidden h-full"
          >
            <div className="overflow-x-auto">
              {data.length > 0 ? (
                <Suspense fallback={<LoadingSpinner />}>
                  <ChartSanidad planes={data} />
                </Suspense>
              ) : (
                <Alert text="No hay conjuntos para mostrar." />
              )}
            </div>
            <div className="overflow-x-auto">
              {data.length > 0 ? (
                <Suspense fallback={<LoadingSpinner />}>
                  <DataTable
                    columns={columnsSanidad as ColumnDef<unknown, unknown>[]}
                    data={filasTabla}
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
                    columns={columnsSanidad as ColumnDef<unknown, unknown>[]}
                    data={filasTabla}
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
                  <ChartSanidad planes={data} />
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
