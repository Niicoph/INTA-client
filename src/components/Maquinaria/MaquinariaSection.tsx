import CargaDatosContainer from "./CargaDatos/CargaDatosContainer";
import CotizacionesContainer from "../Cotizaciones/CotizacionesContainer";
import VisualizacionContainer from "./Visualizacion/VisualizacionContainer";

export default function MaquinariaSection() {
  return (
    <>
      <CotizacionesContainer />
      <CargaDatosContainer />
      <VisualizacionContainer />
    </>
  );
}
