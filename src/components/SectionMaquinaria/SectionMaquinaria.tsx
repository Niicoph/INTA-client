import ContainerCargaDatos from "../ContainerCargaDatos/ContainerCargaDatos";
import ContainerCotizaciones from "../ContainerCotizaciones/ContainerCotizaciones";
import ContainerVisualizacion from "../ContainerVisualizacion/ContainerVisualizacion";
import ChartMaquinaria from "./ChartMaquinaria/ChartMaquinaria";
import FormMaquinaria from "./FormMaquinaria/FormMaquinaria";

export default function SectionMaquinaria() {
  return (
    <>
      <ContainerCotizaciones />
      <ContainerCargaDatos>
        <FormMaquinaria />
      </ContainerCargaDatos>
      <ContainerVisualizacion>
        <ChartMaquinaria />
      </ContainerVisualizacion>
    </>
  );
}
