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
          <Link className="bg-orange-100 hover:bg-orange-300 data-[state=active]:bg-orange-300" to="/maquinaria">
            Maquinaria
          </Link>
        </TabsTrigger>
        <TabsTrigger asChild value="Sanitizacion">
          <Link className="bg-green-100 hover:bg-green-300 data-[state=active]:bg-green-300" to="/sanitizacion">
            Sanitización
          </Link>
        </TabsTrigger>
        <TabsTrigger asChild value="Fertilizacion">
          <Link className="bg-blue-100 hover:bg-blue-300 data-[state=active]:bg-blue-300" to="/fertilizacion">
            Fertilización
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
