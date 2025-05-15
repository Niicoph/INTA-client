import TitleContainer from "../TitleContainer/TitleContainer";
import InfoCard from "../InfoCard/InfoCard";

import CotizacionesIcon from "../../assets/Icons/Outlined/cotizaciones.png";

export default function FertilizacionSection() {
  return (
    <>
      <TitleContainer title="Cotizaciones" icon={CotizacionesIcon}>
        <div className="w-full rounded-b-lg p-4 gap-4 flex flex-col">
          <InfoCard type="MEP" value="1.401,00" time="15:10:44" />
          <InfoCard type="Oficial" value="1.500,00" time="12:40:20" />
          <InfoCard type="Agro" value="1.231,00" time="11:12:01" />
        </div>
      </TitleContainer>
    </>
  );
}
