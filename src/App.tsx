import { MaquinariaProvider } from './context/MaquinariaContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SectionSkeleton from './components/Loadings/SectionSkeleton/SectionSkeleton';
import SipanLogo from '/Sipan.png';
import { lazy, Suspense } from 'react';

const Sanitizacion = lazy(() => import('@/pages/Sanitizacion/Sanitizacion'));
const Fertilizacion = lazy(() => import('@/pages/Fertilizacion/Fertilizacion'));
const Maquinaria = lazy(() => import('@/pages/Maquinaria/Maquinaria'));

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
          <TabsList className="w-full h-12 text-lg ">
            <TabsTrigger value="tab1">Maquinaria</TabsTrigger>
            <TabsTrigger value="tab2">Sanitización</TabsTrigger>
            <TabsTrigger value="tab3">Fertilización</TabsTrigger>
          </TabsList>

          <TabsContent value="tab1" aria-label="Sección Maquinaria">
            <Suspense fallback={<SectionSkeleton />}>
              <Maquinaria />
            </Suspense>
          </TabsContent>

          <TabsContent value="tab2" aria-label="Sección Sanitizacion">
            <Suspense fallback={<SectionSkeleton />}>
              <Sanitizacion />
            </Suspense>
          </TabsContent>

          <TabsContent value="tab3" aria-label="Sección Fertilizacion">
            <Suspense fallback={<SectionSkeleton />}>
              <Fertilizacion />
            </Suspense>
          </TabsContent>
        </MaquinariaProvider>
      </Tabs>
    </main>
  );
}

export default App;
