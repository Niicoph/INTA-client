import ContainerCargaDatos from '../ContainerCargaDatos/ContainerCargaDatos';
import ContainerCotizaciones from '../ContainerCotizaciones/ContainerCotizaciones';
import ContainerVisualizacion from '../ContainerVisualizacion/ContainerVisualizacion';
import ChartMaquinaria from './ChartMaquinaria/ChartMaquinaria';
import FormMaquinaria from './FormMaquinaria/FormMaquinaria';
import FormMaquinariaNew from './FormMaquinaria/FormMaquinariaNew';

export default function SectionMaquinaria() {
  
  
  return (
    <>
      <ContainerCotizaciones />
      <ContainerCargaDatos>
        <FormMaquinaria />
        <FormMaquinariaNew/>
      </ContainerCargaDatos>
      <ContainerVisualizacion>
        <ChartMaquinaria />
      </ContainerVisualizacion>
    </>
  );
}