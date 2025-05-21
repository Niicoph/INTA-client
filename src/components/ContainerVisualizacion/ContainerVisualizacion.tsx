import TitleContainer from '../ui/TitleContainer/TitleContainer';
import GraficoBarrasIcon from '../../assets/Icons/Outlined/graficoBarras.png';

export default function ContainerVisualizacion({ children }: { children: React.ReactNode }) {
  return (
    <TitleContainer title="Comparaciones" icon={GraficoBarrasIcon}>
      {children}
    </TitleContainer>
  );
}
