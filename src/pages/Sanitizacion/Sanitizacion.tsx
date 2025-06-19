import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import FormProducto from '@/components/Forms/Sanitizacion/FormProducto';
import FormPlan from '@/components/Forms/Sanitizacion/FormPlan';
import VisualizacionSanitizacion from '@/components/Containers/VisualizacionSanitizacion';

import Header from '@/components/Header/Header';
import TabsNav from '@/components/TabsNav/TabsNav';

export default function Sanitizacion() {
  return (
    <main className="flex flex-col  items-center w-full min-h-screen min-w-[350px] bg-background gap-4 p-4">
      <Header />
      <TabsNav />
      <div className="w-full flex h-full flex-col gap-4 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl xl:h-[950px] 2xl:max-w-[1600px] ">
        <section className="grid grid-cols-1 gap-4 w-full h-full xl:flex">
          <div className="flex flex-col gap-4 h-full w-full xl:w-1/3 justify-between">
            <ContainerCotizaciones dollar={true} />
            <div className="flex flex-col h-full gap-4">
              <FormProducto />
              <FormPlan />
            </div>
          </div>
          <div className="w-full xl:flex xl:flex-col xl:w-2/3 gap-4">
            <VisualizacionSanitizacion />
          </div>
        </section>
      </div>
    </main>
  );
}
