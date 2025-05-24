import ContainerCargaDatos from '../ContainerCargaDatos/ContainerCargaDatos';
import ContainerCotizaciones from '../ContainerCotizaciones/ContainerCotizaciones';
import ContainerVisualizacion from '../ContainerVisualizacion/ContainerVisualizacion';
import DatosMaquinaria from './DatosMaquinaria/DatosMaquinaria';
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
          <DatosMaquinaria />
        </ContainerVisualizacion>
      </MaquinariaProvider>
    </>
  );
}
