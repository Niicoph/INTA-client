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
        <div className="flex flex-col md:flex-row gap-4 ">
          <div className=" md:w-1/2">
            <ContainerCargaDatos>
              <FormMaquinariaNew />
            </ContainerCargaDatos>
          </div>
          <div className="md:w-1/2">
            <ContainerVisualizacion>
              <DatosMaquinaria />
            </ContainerVisualizacion>
          </div>
        </div>
      </MaquinariaProvider>
    </div>
  );
}
