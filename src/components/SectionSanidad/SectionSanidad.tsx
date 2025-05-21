import ContainerCargaDatos from "../ContainerCargaDatos/ContainerCargaDatos";
import ContainerVisualizacion from "../ContainerVisualizacion/ContainerVisualizacion";
import ContainerCotizaciones from "../ContainerCotizaciones/ContainerCotizaciones";

import FormSanidad from "./FormSanidad/FormSanidad";
import ChartSanidad from "./ChartSanidad/ChartSanidad";

export default function SectionSanidad() {
  return (
    <>
      <ContainerCotizaciones />
      <ContainerCargaDatos>
        <FormSanidad />
      </ContainerCargaDatos>
      <ContainerVisualizacion>
        <ChartSanidad />
      </ContainerVisualizacion>
    </>
  );
}
