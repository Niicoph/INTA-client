import { createContext, useState, type Dispatch } from 'react';
import { type ProductoFormData } from '@/schemas/Fertilizacion/types';

/**
 * Context contiene una lista de fertilizantes.
 */
type FertilizantesContextInterface = {
  data: ProductoFormData[];
  setData: Dispatch<React.SetStateAction<ProductoFormData[]>>;
};

const FertilizantesContext = createContext<FertilizantesContextInterface | null>(null);

const FertilizantesProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<ProductoFormData[]>([]);

  return (
    <FertilizantesContext.Provider value={{ data, setData }}>
      {children}
    </FertilizantesContext.Provider>
  );
};

export { FertilizantesContext, FertilizantesProvider };
