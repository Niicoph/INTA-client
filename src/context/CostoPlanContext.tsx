import { createContext, useState, type Dispatch } from 'react';
import type { CostoPlan } from '@/types/sanitizante';

type CostoPlanContextInterface = {
  data: CostoPlan[];
  setData: Dispatch<React.SetStateAction<CostoPlan[]>>;
};

const CostoPlanContext = createContext<CostoPlanContextInterface | null>(null);

const CostoPlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<CostoPlan[]>([]);

  return (
    <CostoPlanContext.Provider value={{ data, setData }}>{children}</CostoPlanContext.Provider>
  );
};

if (!CostoPlanContext) {
  throw new Error('CostoPlanContext must be used within a CostoPlanProvider');
}
export { CostoPlanContext, CostoPlanProvider };
