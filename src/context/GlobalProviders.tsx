import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MaquinariaProvider } from '@/context/MaquinariaContext';
import { CostoPlanProvider } from '@/context/CostoPlanContext';
import { SanitizantesProvider } from '@/context/SanitizantesContext';
import { FertilizantesProvider } from '@/context/FertilizantesContext';
import { CostoPlanFertilizacionProvider } from '@/context/CostoPlanFertilizacionContext';

const queryClient = new QueryClient();

export function GlobalProviders({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <MaquinariaProvider>
                    <CostoPlanProvider>
                        <CostoPlanFertilizacionProvider>
                            <FertilizantesProvider>
                                <SanitizantesProvider>
                                    {children}
                                </SanitizantesProvider>
                            </FertilizantesProvider>
                        </CostoPlanFertilizacionProvider>
                    </CostoPlanProvider>
                </MaquinariaProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}