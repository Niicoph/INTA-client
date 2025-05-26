import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SectionMaquinaria from './components/SectionMaquinaria/SectionMaquinaria';
import SectionSanidad from './components/SectionSanidad/SectionSanidad';
import SectionFertilizacion from './components/SectionFertilizacion/SectionFertilizacion';

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-[350px] bg-background">
      <main className="mx-auto flex flex-col min-h-screen w-full p-4  md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-[1400px]">
        <Tabs defaultValue="tab1" className="w-full flex flex-col gap-4 flex-1">
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

          <TabsContent value="tab1" aria-label="Maquinaria" className="flex flex-col gap-4">
            <SectionMaquinaria />
          </TabsContent>

          <TabsContent value="tab2" aria-label="Sanidad" className="flex flex-col gap-4">
            <SectionSanidad />
          </TabsContent>

          <TabsContent value="tab3" aria-label="Fertilizacion" className="flex flex-col gap-4">
            <SectionFertilizacion />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;
