import Home from '@/pages/Home/Home';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { router } from './RouterApp';
import SectionSkeleton from '@/components/Loadings/SectionSkeleton/SectionSkeleton';

const Sanitizacion = lazy(() => import('@/pages/Sanitizacion/Sanitizacion'));
const Fertilizacion = lazy(() => import('@/pages/Fertilizacion/Fertilizacion'));
const Maquinaria = lazy(() => import('@/pages/Maquinaria/Maquinaria'));

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={router.home} element={<Home />} />
        <Route
          path={router.maquinaria}
          element={
            <Suspense fallback={<SectionSkeleton />}>
              <Maquinaria />
            </Suspense>
          }
        />
        <Route
          path={router.sanitizacion}
          element={
            <Suspense fallback={<SectionSkeleton />}>
              <Sanitizacion />
            </Suspense>
          }
        />
        <Route
          path={router.fertilizacion}
          element={
            <Suspense fallback={<SectionSkeleton />}>
              <Fertilizacion />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
