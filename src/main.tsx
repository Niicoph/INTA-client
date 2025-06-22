import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RoutesApp from '@/routes/RoutesApp';
import { MaquinariaProvider } from './context/MaquinariaContext';
import { CostoPlanProvider } from './context/CostoPlanContext';
import { ProductosProvider } from './context/ProductosContext';
import { FertilizantesProvider } from './context/FertilizantesContext';
import { CostoPlanFertilizacionProvider } from './context/CostoPlanFertilizacionContext';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <MaquinariaProvider>
      <CostoPlanProvider>
        <CostoPlanFertilizacionProvider>
          <FertilizantesProvider>
            <ProductosProvider>
              <RoutesApp />
            </ProductosProvider>
          </FertilizantesProvider>
        </CostoPlanFertilizacionProvider>
      </CostoPlanProvider>
    </MaquinariaProvider>
  </QueryClientProvider>
);
