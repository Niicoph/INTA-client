import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MaquinariaSection from "./components/Maquinaria/MaquinariaSection";
import SanidadSection from "./components/Sanidad/SanidadSection";
import FertilizacionSection from "./components/Fertilizacion/FertilizacionSection";

function App() {
  return (
    <div className="flex justify-center items-center h-screen min-w-[300px]">
      <main className="flex flex-col w-full h-full p-4">
        <div className="flex flex-col flex-1">
          <Tabs
            defaultValue="tab1"
            className="w-full h-full flex flex-col gap-4 "
          >
            <TabsList className="rounded-sm w-full h-12 text-lg">
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
            {/* Maquinaria content */}
            <TabsContent
              value="tab1"
              aria-label="Maquinaria"
              className="flex flex-col gap-4"
            >
              <MaquinariaSection />
            </TabsContent>
            <TabsContent
              value="tab2"
              aria-label="Sanidad"
              className="flex flex-col gap-4"
            >
              <SanidadSection />
            </TabsContent>
            <TabsContent
              value="tab3"
              aria-label="Fertilizacion"
              className="flex flex-col gap-4"
            >
              <FertilizacionSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default App;
