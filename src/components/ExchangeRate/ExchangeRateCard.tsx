import TitleContainer from "../TitleContainer/TitleContainer";
import CotizacionesIcon from "../../assets/Icons/Outlined/cotizaciones.png";

import DollarCard from "./DollarCard";
import DieselCard from "./DieselCard";


export default function ExchangeRateCard() {
  return (
    <TitleContainer title="Cotizaciones" icon={CotizacionesIcon}>
      <div className="w-full rounded-b-lg p-4 gap-4 flex flex-col">
        <DollarCard />
        <DieselCard province="NEUQUEN" />
        <DieselCard province="RIO NEGRO" />
      </div>
    </TitleContainer>
  );
}
