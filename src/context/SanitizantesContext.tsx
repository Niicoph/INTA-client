import { createContext, useState, type Dispatch } from 'react';
import { type ProductoFormData } from '@/schemas/Sanitizacion/types';

/**
 * Context contiene una lista de sanitizantes.
 */
type SanitizantesContextInterface = {
  data: ProductoFormData[];
  setData: Dispatch<React.SetStateAction<ProductoFormData[]>>;
};

const SanitizantesContext = createContext<SanitizantesContextInterface | null>(null);

const SanitizantesProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<ProductoFormData[]>([]);

  return (
    <SanitizantesContext.Provider value={{ data, setData }}>
      {children}
    </SanitizantesContext.Provider>
  );
};

export { SanitizantesContext, SanitizantesProvider };
