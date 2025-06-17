/**
 * Contexto contiene una lista de planes.
 */

import { createContext, useState, type Dispatch } from 'react';
import type { PlanFormData } from '@/schemas/Sanitizacion/types';

type PlanContextInterface = {
  data: PlanFormData[];
  setData: Dispatch<React.SetStateAction<PlanFormData[]>>;
};

const PlanContext = createContext<PlanContextInterface | null>(null);

const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<PlanFormData[]>([]);

  return <PlanContext.Provider value={{ data, setData }}>{children}</PlanContext.Provider>;
};

if (!PlanContext) {
  throw new Error('PlanContext must be used within a PlanProvider');
}
export { PlanContext, PlanProvider };
