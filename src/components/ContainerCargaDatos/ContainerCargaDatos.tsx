import TitleContainer from "../ui/TitleContainer/TitleContainer";
import CargaDatosIcon from "../../assets/Icons/Outlined/cargaDatos.png";
import { type ReactNode } from "react";

export default function ContainerCargaDatos({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TitleContainer title="Carga de datos" icon={CargaDatosIcon}>
      {children}
    </TitleContainer>
  );
}
