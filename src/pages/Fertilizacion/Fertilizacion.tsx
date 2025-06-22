import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import VisualizacionFertilizacion from '@/components/Containers/VisualizacionFertilizacion';
import FormProducto from '@/components/Forms/Fertilizacion/FormProducto';
import FormPlan from '@/components/Forms/Fertilizacion/FormPlan';

import AppLayout from '@/layouts/AppLayout';

export default function Fertilizacion() {
  return (
    <AppLayout
      ContainerCotizaciones={<ContainerCotizaciones dollar={true} />}
      Form={
        <div className="flex flex-col h-full gap-4">
          <FormProducto />
          <FormPlan />
        </div>
      }
      Visualizacion={<VisualizacionFertilizacion />}
    />
  );
}
