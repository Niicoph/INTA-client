import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export default function TabsNav() {
  const location = useLocation();

  const tabValue = useMemo(() => {
    if (location.pathname.startsWith('/maquinaria')) return 'Maquinaria';
    if (location.pathname.startsWith('/sanitizacion')) return 'Sanitizacion';
    if (location.pathname.startsWith('/fertilizacion')) return 'Fertilizacion';
  }, [location.pathname]);

  return (
    <Tabs
      value={tabValue}
      className="w-full flex h-full flex-col gap-4 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-[1600px] "
    >
      <TabsList className="w-full h-12 gap-2 p-1 text-lg">
        <TabsTrigger asChild value="Maquinaria">
          <Link className="text-orange-400 font-semibold hover:text-orange-500 hover:font-bold  data-[state=active]:text-orange-500 data-[state=active]:font-bold" to="/maquinaria">
            Maquinaria
          </Link>
        </TabsTrigger>
        <TabsTrigger asChild value="Sanitizacion">
          <Link className="text-green-500 font-semibold hover:text-green-600 hover:font-bold data-[state=active]:text-green-600 data-[state=active]:font-bold" to="/sanitizacion">
            Sanitización
          </Link>
        </TabsTrigger>
        <TabsTrigger asChild value="Fertilizacion">
          <Link className="!text-blue-500 font-semibold hover:text-blue-600 hover:font-bold  data-[state=active]:text-blue-600 data-[state=active]:font-bold" to="/fertilizacion">          
            Fertilización
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
