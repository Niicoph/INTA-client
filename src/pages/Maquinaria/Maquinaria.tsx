import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import FormMaquinaria from '@/components/Forms/Maquinaria/FormMaquinaria';
import VisualizacionMaquinaria from '@/components/Containers/VisualizacionMaquinaria';

export default function Maquinaria() {
  return (
    <section className="gap-4 flex flex-col w-full h-full ">
      <ContainerCotizaciones />
      <div className="h-full w-full gap-4 grid xl:grid-cols-2 xl:h-[760px] overflow-hidden ">
        <FormMaquinaria />
        <VisualizacionMaquinaria />
      </div>
    </section>
  );
}
