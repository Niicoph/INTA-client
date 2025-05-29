import ContainerCargaDatos from '../ContainerCargaDatos/ContainerCargaDatos';
import ContainerCotizaciones from '../ContainerCotizaciones/ContainerCotizaciones';
import ContainerVisualizacion from '../ContainerVisualizacion/ContainerVisualizacion';
import DatosMaquinaria from './DatosMaquinaria/DatosMaquinaria';
import FormMaquinariaNew from './FormMaquinaria/FormMaquinariaNew';

export default function SectionMaquinaria() {
  return (
    <div className="flex flex-col gap-4 h-full flex-1">
      <ContainerCotizaciones />
      <div className="flex flex-col gap-4 flex-1  lg:flex-row ">
        <div className="w-full min-w-0 flex flex-1 lg:w-1/2">
          <ContainerCargaDatos>
            <FormMaquinariaNew />
          </ContainerCargaDatos>
        </div>
        <div className="w-full min-w-0 flex flex-1 lg:w-1/2 ">
          <ContainerVisualizacion>
            <DatosMaquinaria />
          </ContainerVisualizacion>
        </div>
      </div>
    </div>
  );
}
