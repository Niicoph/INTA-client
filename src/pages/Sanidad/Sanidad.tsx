import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import { PresentacionesProvider } from '@/context/PresentacionesContext';
import FormPresentacion from '@/components/Forms/Sanidad/FormPresentacion';
import FormPlan from '@/components/Forms/Sanidad/FormPlan';
import VisualizacionSanidad from '@/components/Containers/VisualizacionSanidad';

export default function Sanidad() {
  return (
    <section className="gap-4 flex flex-col w-full h-full ">
      <ContainerCotizaciones />
      <div className="h-full w-full gap-4 grid xl:grid-cols-2 xl:h-[720px] 2xl:h-[640px] overflow-hidden ">
        <div className="flex gap-4">
          <PresentacionesProvider>
            <FormPresentacion />
            <FormPlan />
          </PresentacionesProvider>
        </div>
        <VisualizacionSanidad />
      </div>
    </section>
  );
}
