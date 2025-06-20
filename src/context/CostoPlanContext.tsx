import { createContext, useState, type Dispatch } from 'react';
import type { Plan } from '@/types/sanitizante';

type CostoPlanContextInterface = {
  data: Plan[];
  setData: Dispatch<React.SetStateAction<Plan[]>>;
};

const CostoPlanContext = createContext<CostoPlanContextInterface | null>(null);

const CostoPlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Plan[]>([]);

  return (
    <CostoPlanContext.Provider value={{ data, setData }}>{children}</CostoPlanContext.Provider>
  );
};

if (!CostoPlanContext) {
  throw new Error('CostoPlanContext must be used within a CostoPlanProvider');
}
export { CostoPlanContext, CostoPlanProvider };
