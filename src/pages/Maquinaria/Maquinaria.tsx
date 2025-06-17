import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import FormMaquinaria from '@/components/Forms/Maquinaria/FormMaquinaria';
import VisualizacionMaquinaria from '@/components/Containers/VisualizacionMaquinaria';
import Header from '@/components/Header/Header';
import TabsNav from '@/components/TabsNav/TabsNav';

export default function Maquinaria() {
  return (
    <main className="flex flex-col  items-center w-full min-h-screen min-w-[350px] bg-background gap-4 p-4">
      <Header />
      <TabsNav />
      <div className="w-full flex h-full flex-col gap-4 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl xl:h-[950px] 2xl:max-w-[1400px] ">
        <section className="grid grid-cols-1 gap-4 w-full h-full xl:flex">
          <div className="flex flex-col gap-4 h-full w-full xl:w-1/3 justify-between">
            <ContainerCotizaciones dollar={true} gasoil={true} />
            <FormMaquinaria />
          </div>
          <div className="w-full xl:flex xl:flex-row xl:w-2/3">
            <VisualizacionMaquinaria />
          </div>
        </section>
      </div>
    </main>
  );
}
