import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import FormFertilizacion from '@/components/Forms/Fertilizacion/FormFertilizacion';
import VisualiacionFertilizacion from '@/components/Containers/VisualizacionFertilizacion';
import Header from '@/components/Header/Header';
import TabsNav from '@/components/TabsNav/TabsNav';

export default function Fertilizacion() {
  return (
    <main className="flex flex-col  items-center w-full min-h-screen min-w-[350px] bg-background gap-4 p-4">
      <Header />
      <TabsNav />
      <div className="w-full flex h-full flex-col gap-4 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-[1400px]">
        <section className="gap-4 flex flex-col w-full h-full">
          <ContainerCotizaciones dollar={true} />
          <div className="h-full w-full gap-4 grid xl:grid-cols-2 xl:h-[720px] 2xl:h-[640px] overflow-hidden">
            <FormFertilizacion />
            <VisualiacionFertilizacion />
          </div>
        </section>
      </div>
    </main>
  );
}
