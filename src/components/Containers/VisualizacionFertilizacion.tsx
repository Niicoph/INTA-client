import VisualizacionesIcon from '@/assets/Icons/Outlined/graficoBarras.png';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CostoPlanFertilizacionContext } from '@/context/CostoPlanFertilizacionContext';
import { useContext } from 'react';
import DataTable from '../ui/DataTable/DataTable';
import { flattenPlanes } from '@/utils/flattenPlanesFertilizacion';
import { columnsFertilizacion } from '../ui/DataTable/columnsFertilizacion';

import ChartFertilizacion from '../Charts/ChartFertilizacion';

export default function VisualizacionFertilizacion() {
  const costoPlanContext = useContext(CostoPlanFertilizacionContext);
  if (!costoPlanContext) {
    return null;
  }

  const { data } = costoPlanContext;

  const filasTabla = flattenPlanes(data);

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
            <Button variant="outline" className="h-10 w-full md:w-fit">
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
              <ChartFertilizacion planes={data} />
            </div>
            <div className="overflow-x-auto">
              <DataTable columns={columnsFertilizacion} data={filasTabla} />
            </div>
          </TabsContent>

          <TabsContent
            value="tab2"
            aria-label="Tabla"
            className="w-full min-w-0 grid grid-rows-1 gap-4 overflow-hidden h-full"
          >
            <div className="overflow-x-auto h-full">
              <DataTable columns={columnsFertilizacion} data={filasTabla} />
            </div>
          </TabsContent>

          <TabsContent
            value="tab3"
            aria-label="Grafico"
            className="w-full min-w-0 grid grid-rows-1 gap-4 overflow-hidden h-full"
          >
            <ChartFertilizacion planes={data} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
