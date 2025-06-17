import VisualizacionesIcon from '@/assets/Icons/Outlined/graficoBarras.png';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';

export default function VisualizacionSanitizacion() {
  return (
    <div className="rounded-md flex flex-col border border-border overflow-hidden h-full w-full">
      <TitleContainer icon={VisualizacionesIcon} title="Visualización Gráfica" />
    </div>
  );
}
