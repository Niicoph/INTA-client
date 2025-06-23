import TabsNav from '@/components/TabsNav/TabsNav';
import { Outlet } from 'react-router-dom';

export default function ModuloLayout() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen min-w-[350px] bg-background gap-4 p-4">
      <TabsNav />
      <Outlet />
    </div>
  );
}
