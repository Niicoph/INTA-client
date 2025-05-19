import TitleContainer from "@/components/ui/TitleContainer/TitleContainer";
import CotizacionesIcon from "../../assets/Icons/Outlined/cotizaciones.png";
import CotizacionesCard from "./CotizacionesCard";
import { useExchangeRate } from "@/hooks/useDollarRate";
import { DollarSignIcon } from "lucide-react";
// import { FuelIcon } from "lucide-react";

export default function CotizacionesContainer() {
  const dollarQuery = useExchangeRate("USD");

  const tipoCotizacion = dollarQuery.data?.detalle?.[0]?.tipoCotizacion ?? 0;
  const [year, month, day] = dollarQuery.data?.fecha
    ?.split("-")
    .map(Number) ?? [0, 0, 0];
  const fecha = new Date(year, month - 1, day).toLocaleDateString("es-AR");

  return (
    <TitleContainer title="Cotizaciones" icon={CotizacionesIcon}>
      <div className="w-full rounded-b-lg  flex flex-col">
        <CotizacionesCard
          type="Dólar Oficial"
          value={tipoCotizacion.toString()}
          time={fecha}
          icon={<DollarSignIcon color="#006936" size={24} />}
          color="96C1AC"
        />
        <CotizacionesCard
          type="Dólar Oficial"
          value={tipoCotizacion.toString()}
          time={fecha}
          icon={<DollarSignIcon color="#006936" size={24} />}
          color="96C1AC"
        />
      </div>
    </TitleContainer>
  );
}
