import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import { ProductosProvider } from '@/context/ProductosContext';
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
      <div className="w-full flex h-full flex-col gap-4 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-[1400px]">
        <section className="grid grid-cols-1 gap-4 w-full h-full xl:flex">
          <div className="flex flex-col 2xl:flex-row gap-4 h-full w-full 2xl:w-1/2">
            <ProductosProvider>
              <div className="flex flex-col gap-4 2xl:w-2/5">
                <ContainerCotizaciones dollar={true} />
                <FormProducto />
              </div>
              <div className="grid grid-cols-1 gap-4 2xl:w-3/5">
                <FormPlan />
              </div>
            </ProductosProvider>
          </div>
          <div className="w-full 2xl:flex 2xl:flex-row 2xl:w-1/2">
            <VisualizacionSanitizacion />
          </div>
        </section>
      </div>
    </main>
  );
}
