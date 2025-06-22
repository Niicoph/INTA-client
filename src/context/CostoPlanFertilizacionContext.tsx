import { createContext, useState, type Dispatch, type SetStateAction } from 'react';
import { type Plan } from '@/types/fertilizacion';

type CostoPlanFertilizacionContextInterface = {
  data: Plan[];
  setData: Dispatch<SetStateAction<Plan[]>>;
  remove: (id_plan: string) => void;
};

const CostoPlanFertilizacionContext = createContext<CostoPlanFertilizacionContextInterface | null>(
  null
);

const CostoPlanFertilizacionProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Plan[]>([]);

  const remove = (id_plan: string) => {
    setData((prev) => prev.filter((plan) => plan.id_plan !== id_plan));
  };

  return (
    <CostoPlanFertilizacionContext.Provider value={{ data, setData, remove }}>
      {children}
    </CostoPlanFertilizacionContext.Provider>
  );
};

export { CostoPlanFertilizacionContext, CostoPlanFertilizacionProvider };
