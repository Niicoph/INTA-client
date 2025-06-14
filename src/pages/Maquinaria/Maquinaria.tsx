import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import FormMaquinaria from '@/components/Forms/Maquinaria/FormMaquinaria';
import VisualizacionMaquinaria from '@/components/Containers/VisualizacionMaquinaria';

export default function Maquinaria() {
  return (
    <section className="grid grid-cols-1 gap-4 w-full h-full xl:flex xl:flex-row">
      <div className="flex flex-col gap-4 h-full w-full xl:w-2/5">
        <ContainerCotizaciones />
        <FormMaquinaria />  
      </div>
      <div className='w-full xl:flex xl:flex-row xl:w-3/5'>
        <VisualizacionMaquinaria />
      </div>
    </section>
  );
}
