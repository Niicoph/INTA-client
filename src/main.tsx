import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RoutesApp from '@/routes/RoutesApp';
import { MaquinariaProvider } from './context/MaquinariaContext';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <MaquinariaProvider>
      <RoutesApp />
    </MaquinariaProvider>
  </QueryClientProvider>
);
