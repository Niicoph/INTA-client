import TitleContainer from "../TitleContainer/TitleContainer";
import InfoCard from "../InfoCard/InfoCard";
import CotizacionesIcon from "../../assets/Icons/Outlined/cotizaciones.png";
import { useExchangeRate } from "../Hooks/useExchangeRate";

export default function ExchangeRateCard() {
  const { data, loading, error } = useExchangeRate("USD");

  if (loading) return <p>Cargando cotizaciones...</p>; //pendiente de editar animación de carga
  if (error || !data) return <p>Error: {error ?? "Datos no disponibles"}</p>;

  const tipoCotizacion = data.detalle[0]?.tipoCotizacion ?? 0;
  const [year, month, day] = data.fecha.split("-").map(Number);
  const fecha = new Date(year, month - 1, day).toLocaleDateString('es-AR'); 

  return (
    <TitleContainer title="Cotizaciones" icon={CotizacionesIcon}>
      <div className="w-full rounded-b-lg p-4 gap-4 flex flex-col">
        <InfoCard
          type="Oficial"
          value={tipoCotizacion.toString()}
          time={fecha}
        />
      </div>
    </TitleContainer>
  );
}
