import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import FormProducto from '@/components/Forms/Sanitizacion/FormProducto';
import FormPlan from '@/components/Forms/Sanitizacion/FormPlan';
import VisualizacionSanitizacion from '@/components/Containers/VisualizacionSanitizacion';
import CalcLayout from '@/layouts/CalcLayout';

export default function Sanitizacion() {
  return (
    <CalcLayout
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
