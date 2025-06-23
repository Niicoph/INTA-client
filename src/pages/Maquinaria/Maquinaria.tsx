import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import FormMaquinaria from '@/components/Forms/Maquinaria/FormMaquinaria';
import VisualizacionMaquinaria from '@/components/Containers/VisualizacionMaquinaria';
import CalcLayout from '@/layouts/CalcLayout';

export default function Maquinaria() {
  return (
    <CalcLayout
      ContainerCotizaciones={<ContainerCotizaciones dollar={true} gasoil={true} />}
      Form={<FormMaquinaria />}
      Visualizacion={<VisualizacionMaquinaria />}
    />
  );
}
