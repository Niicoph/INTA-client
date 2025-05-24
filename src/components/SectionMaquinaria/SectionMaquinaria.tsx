import ContainerCargaDatos from '../ContainerCargaDatos/ContainerCargaDatos';
import ContainerCotizaciones from '../ContainerCotizaciones/ContainerCotizaciones';
import ContainerVisualizacion from '../ContainerVisualizacion/ContainerVisualizacion';
import DatosMaquinaria from './DatosMaquinaria/DatosMaquinaria';
import FormMaquinariaNew from './FormMaquinaria/FormMaquinariaNew';

import { MaquinariaProvider } from '@/context/MaquinariaContext';

export default function SectionMaquinaria() {
  return (
    <div className="flex flex-col gap-4">
      <ContainerCotizaciones />
      <MaquinariaProvider>
        <div className="flex gap-4">
          <ContainerCargaDatos>
            <FormMaquinariaNew />
          </ContainerCargaDatos>
          <ContainerVisualizacion>
            <DatosMaquinaria />
          </ContainerVisualizacion>
        </div>
      </MaquinariaProvider>
    </div>
  );
}
