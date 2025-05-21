import CotizacionesIcon from "../../assets/Icons/Outlined/cotizaciones.png";
import TitleContainer from "@/components/ui/TitleContainer/TitleContainer";

import CardCotizaciones from "./CardCotizaciones";
import { useDollar } from "@/hooks/useDollar";
import { type Dollar } from "@/types/dollar";
import { DollarSignIcon } from "lucide-react";

export default function ContainerCotizaciones() {
  const { dataCollection, isLoading, isError } = useDollar();

  if (isError) return <div>Ocurrió un error</div>;
  if (!dataCollection) return null;

  return (
    <TitleContainer title="Cotizaciones" icon={CotizacionesIcon}>
      <div className="w-full rounded-b-lg flex flex-col lg:flex-row">
        {dataCollection.map((dollar: Dollar) => {
          const dateObj = new Date(dollar.fechaActualizacion);
          const time = dateObj.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          });

          const rawDate = dateObj.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const [day, , monthRaw, , year] = rawDate.split(" ");
          const capitalizedMonth =
            monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1);
          const date = `${capitalizedMonth} ${day}, ${year}`;

          return (
            <CardCotizaciones
              isLoading={isLoading}
              key={dollar.casa}
              name={dollar.nombre}
              value={dollar.venta}
              date={date}
              time={time}
              icon={<DollarSignIcon color="#ffffff" size={22} />}
              color="96C1AC"
            />
          );
        })}
      </div>
    </TitleContainer>
  );
}
