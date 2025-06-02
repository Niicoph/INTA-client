import VisualizacionesIcon from '@/assets/Icons/Outlined/graficoBarras.png';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';

export default function VisualiacionFertilizacion() {
  return (
    <div className="rounded-md flex flex-col border border-border overflow-hidden ">
      <TitleContainer icon={VisualizacionesIcon} title="Visualización Gráfica" />
    </div>
  );
}
