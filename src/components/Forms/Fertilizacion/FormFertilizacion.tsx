import CargaDatosIcon from '@/assets/Icons/Outlined/cargaDatos.png';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';

export default function FormFertilizacion() {
  return (
    <div className="rounded-md flex flex-col border border-border">
      <TitleContainer icon={CargaDatosIcon} title="Carga de datos" />
    </div>
  );
}
