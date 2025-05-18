import InfoCard from "../InfoCard/InfoCard";
import { useExchangeRate } from "../../hooks/useDollarRate";
import { Progress } from "@/components/ui/progress";

export default function DollarCard() {
  const dollarQuery = useExchangeRate("USD");
  if (dollarQuery.isLoading)
    return (
      <div className="w-4/5 mx-auto">
        <Progress value={50} />
      </div>
    );

  if (!dollarQuery.error || dollarQuery.data) {
    if (!dollarQuery.data) return null;
    const tipoCotizacion = dollarQuery.data.detalle[0].tipoCotizacion ?? 0;
    const [year, month, day] = dollarQuery.data.fecha.split("-").map(Number);
    const fecha = new Date(year, month - 1, day).toLocaleDateString("es-AR");

    return (
      <InfoCard type="Oficial" value={tipoCotizacion.toString()} time={fecha} />
    );
  } else if (dollarQuery.error || !dollarQuery.data) {
    const tipoCotizacion = " Sin conexión";
    const fecha = new Date().toLocaleDateString("es-AR");
    return (
      <InfoCard type="Oficial" value={tipoCotizacion.toString()} time={fecha} />
    );
  }
}
