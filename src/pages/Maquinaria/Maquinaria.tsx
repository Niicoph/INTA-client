import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import FormMaquinaria from '@/components/Forms/Maquinaria/FormMaquinaria';
import VisualizacionMaquinaria from '@/components/Containers/VisualizacionMaquinaria';
import AppLayout from '@/layouts/AppLayout';

export default function Maquinaria() {
  return (
    <AppLayout
      ContainerCotizaciones={<ContainerCotizaciones dollar={true} gasoil={true} />}
      Form={<FormMaquinaria />}
      Visualizacion={<VisualizacionMaquinaria />}
    />
  );
}
