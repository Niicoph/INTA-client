/**
 * Contexto contiene una lista de tratamientos unicos a un plan.
 */

import { createContext, useState, type Dispatch } from 'react';
import { type Tratamiento } from '@/types/sanitizante';

type PlanContextInterface = {
  data: Tratamiento[];
  setData: Dispatch<React.SetStateAction<Tratamiento[]>>;
};

const PlanContext = createContext<PlanContextInterface | null>(null);

const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Tratamiento[]>([]);

  return <PlanContext.Provider value={{ data, setData }}>{children}</PlanContext.Provider>;
};

if (!PlanContext) {
  throw new Error('PlanContext must be used within a PlanProvider');
}
export { PlanContext, PlanProvider };
