import { MaquinariaProvider } from './context/MaquinariaContext';
import { PresentacionesProvider } from './context/PresentacionesContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContainerCotizaciones from './components/Containers/ContainerCotizaciones';
import FormMaquinaria from './components/Forms/Maquinaria/FormMaquinaria';
import VisualizacionMaquinaria from './components/Containers/VisualizacionMaquinaria';
import VisualizacionSanidad from './components/Containers/VisualizacionSanidad';
import VisualiacionFertilizacion from './components/Containers/VisualizacionFertilizacion';
import FormPresentacion from './components/Forms/Sanidad/FormPresentacion';
import FormPlan from './components/Forms/Sanidad/FormPlan';
import SipanLogo from '/Sipan.png';
import FormFertilizacion from './components/Forms/Fertilizacion/FormFertilizacion';

function App() {
  return (
    <main className="flex flex-col  items-center w-full min-h-screen min-w-[350px] bg-background gap-4 p-4">
      <header className="w-full flex justify-center">
        <img src={SipanLogo} alt="Sipan Logo" className="h-10" />
      </header>
      <Tabs
        defaultValue="tab1"
        className="w-full flex h-full flex-col gap-4 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-[1400px]"
      >
        <MaquinariaProvider>
          <TabsList className="rounded-sm w-full h-12 text-lg ">
            <TabsTrigger value="tab1" className="rounded-sm">
              Maquinaria
            </TabsTrigger>
            <TabsTrigger value="tab2" className="rounded-sm">
              Sanidad
            </TabsTrigger>
            <TabsTrigger value="tab3" className="rounded-sm">
              Fertilización
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="tab1"
            aria-label="Maquinaria"
            className="flex flex-col gap-4 w-full h-full overflow-hidden"
          >
            <ContainerCotizaciones />
            <div className="h-full w-full gap-4 grid xl:grid-cols-2 xl:h-[720px] 2xl:h-[640px] overflow-hidden">
              <FormMaquinaria />
              <VisualizacionMaquinaria />
            </div>
          </TabsContent>

          <TabsContent
            value="tab2"
            aria-label="Sanidad"
            className="flex flex-col gap-4 w-full h-full overflow-hidden"
          >
            <ContainerCotizaciones />
            <div className="h-full w-full gap-4 grid xl:grid-cols-2 xl:h-[720px] 2xl:h-[640px] overflow-hidden">
              <div className="flex gap-4">
                <PresentacionesProvider>
                  <FormPresentacion />
                  <FormPlan />
                </PresentacionesProvider>
              </div>
              <VisualizacionSanidad />
            </div>
          </TabsContent>

          <TabsContent
            value="tab3"
            aria-label="Fertilizacion"
            className="flex flex-col gap-4 w-full h-full overflow-hidden"
          >
            <ContainerCotizaciones />
            <div className="h-full w-full gap-4 grid xl:grid-cols-2 xl:h-[720px] 2xl:h-[640px] overflow-hidden">
              <FormFertilizacion />
              <VisualiacionFertilizacion />
            </div>
          </TabsContent>
        </MaquinariaProvider>
      </Tabs>
    </main>
  );
}

export default App;
