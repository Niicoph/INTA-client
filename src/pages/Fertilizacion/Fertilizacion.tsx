import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import FormFertilizacion from '@/components/Forms/Fertilizacion/FormFertilizacion';
import VisualiacionFertilizacion from '@/components/Containers/VisualizacionFertilizacion';

export default function Fertilizacion() {
  return (
    <section className="gap-4 flex flex-col w-full h-full">
      <ContainerCotizaciones />
      <div className="h-full w-full gap-4 grid xl:grid-cols-2 xl:h-[720px] 2xl:h-[640px] overflow-hidden">
        <FormFertilizacion />
        <VisualiacionFertilizacion />
      </div>
    </section>
  );
}
