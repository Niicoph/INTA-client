import ContainerCotizaciones from "../ContainerCotizaciones/ContainerCotizaciones";
import ContainerCargaDatos from "../ContainerCargaDatos/ContainerCargaDatos";
import FormFertilizacion from "./FormFertilizacion/FormFertilizacion";

export default function SectionFertilizacion() {
  return (
    <>
      <ContainerCotizaciones />
      <ContainerCargaDatos>
        <FormFertilizacion />
      </ContainerCargaDatos>
    </>
  );
}
