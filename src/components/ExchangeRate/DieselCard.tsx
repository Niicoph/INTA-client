import InfoCard from "../InfoCard/InfoCard";
import { useGasoilRate } from "../../hooks/useGasoilRate";
import { Progress } from "@/components/ui/progress";

interface DieselCardProps {
  province: string;
}

export default function DieselCard({ province }: DieselCardProps) {
  const dieselQuery = useGasoilRate(province);
  if (dieselQuery.isLoading)
    return (
      <div className="w-4/5 mx-auto">
        <Progress value={50} />
      </div>
    );

  if (!dieselQuery.error || dieselQuery.data) {
    if (!dieselQuery.data) return null;

    // No hago un promedio de los precios porque cada provincia tiene un mismo precio en el área del alto valle según la API
    // Igual dejo que se retornen todas las estaciones por si a futuro se necesita promediar.
    // Se toma el precio solo de estaciones YPF (se pueden filtrar otras desde la API) y gasoil grado 2 (el más barato)
    // La fecha la proporciona la API, se filtra por "indice_tiempo" (año y mes actual) y se usa fecha_vigencia (supuesto último registro)

    const precioDiesel = dieselQuery.data[0]?.precio ?? 0;
    const fecha = new Date(
      dieselQuery.data[0]?.fecha_vigencia
    ).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return (
      <InfoCard
        type={`Diesel ${province}`}
        value={precioDiesel.toString()}
        time={fecha}
      />
    );
  } else if (dieselQuery.error || !dieselQuery.data) {
    const precioDiesel = " Sin conexión";
    const fecha = new Date().toLocaleDateString("es-AR");
    return (
      <InfoCard
        type={`Diesel ${province}`}
        value={precioDiesel.toString()}
        time={fecha}
      />
    );
  }
}
