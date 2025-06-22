import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import FormProducto from '@/components/Forms/Sanitizacion/FormProducto';
import FormPlan from '@/components/Forms/Sanitizacion/FormPlan';
import VisualizacionSanitizacion from '@/components/Containers/VisualizacionSanitizacion';
import AppLayout from '@/layouts/AppLayout';

export default function Sanitizacion() {
  return (
    <AppLayout
      ContainerCotizaciones={<ContainerCotizaciones dollar={true} />}
      Form={
        <div className="flex flex-col h-full gap-4">
          <FormProducto />
          <FormPlan />
        </div>
      }
      Visualizacion={<VisualizacionSanitizacion />}
    />
  );
}
