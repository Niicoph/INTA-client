import { createContext, useState, type Dispatch, type SetStateAction } from 'react';
import type { Plan } from '@/types/sanitizante';

type CostoPlanContextInterface = {
  data: Plan[];
  setData: Dispatch<SetStateAction<Plan[]>>;
  remove: (id_plan: string) => void;
};

const CostoPlanContext = createContext<CostoPlanContextInterface | null>(null);

const CostoPlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Plan[]>([]);

  const remove = (id_plan: string) => {
    setData((prev) => prev.filter((plan) => plan.id_plan !== id_plan));
  };

  return (
    <CostoPlanContext.Provider value={{ data, setData, remove }}>
      {children}
    </CostoPlanContext.Provider>
  );
};

export { CostoPlanContext, CostoPlanProvider };