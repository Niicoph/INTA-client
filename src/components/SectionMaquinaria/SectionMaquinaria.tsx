import ContainerCargaDatos from '../ContainerCargaDatos/ContainerCargaDatos';
import ContainerCotizaciones from '../ContainerCotizaciones/ContainerCotizaciones';
import ContainerVisualizacion from '../ContainerVisualizacion/ContainerVisualizacion';
import ChartMaquinaria from './ChartMaquinaria/ChartMaquinaria';
import FormMaquinariaNew from './FormMaquinaria/FormMaquinariaNew';

import { MaquinariaProvider } from '@/context/MaquinariaContext';

export default function SectionMaquinaria() {
  return (
    <>
      <ContainerCotizaciones />
      <MaquinariaProvider>
        <ContainerCargaDatos>
          <FormMaquinariaNew />
        </ContainerCargaDatos>
        <ContainerVisualizacion>
          <ChartMaquinaria />
        </ContainerVisualizacion>
      </MaquinariaProvider>
    </>
  );
}
