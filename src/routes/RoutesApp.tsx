import Home from '@/pages/Home/Home';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { router } from './RouterApp';
import SectionSkeleton from '@/components/Loadings/SectionSkeleton/SectionSkeleton';

const Sanitizacion = lazy(() => import('@/pages/Sanitizacion/Sanitizacion'));
const Fertilizacion = lazy(() => import('@/pages/Fertilizacion/Fertilizacion'));
const Maquinaria = lazy(() => import('@/pages/Maquinaria/Maquinaria'));
const PageLayout = lazy(() => import('@/layouts/PageLayout'));

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={router.home} element={<Home />} />

        <Route
          element={
            <Suspense fallback={<SectionSkeleton />}>
              <PageLayout />
            </Suspense>
          }
        >
          <Route path={router.maquinaria} element={<Maquinaria />} />
          <Route path={router.sanitizacion} element={<Sanitizacion />} />
          <Route path={router.fertilizacion} element={<Fertilizacion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
